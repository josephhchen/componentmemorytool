#import "MemoryUsage.h"
#import <mach/mach.h>
#import <sys/types.h>
#import <sys/sysctl.h>
#import <net/if.h>
#import <net/if_dl.h>
#import <ifaddrs.h>

@implementation MemoryUsage

RCT_EXPORT_MODULE();

- (NSDictionary *)getNetworkUsage {
    BOOL success;
    struct ifaddrs *addrs;
    const struct ifaddrs *cursor;
    unsigned long long wifi_in = 0, wifi_out = 0, wwan_in = 0, wwan_out = 0;

    success = getifaddrs(&addrs) == 0;
    if (success) {
        cursor = addrs;
        while (cursor != NULL) {
            if (cursor->ifa_addr->sa_family == AF_LINK) {
                const struct if_data *ifa_data = (struct if_data *)cursor->ifa_data;
                if (ifa_data != NULL) {
                    if (strncmp(cursor->ifa_name, "en", 2) == 0) {
                        wifi_in += ifa_data->ifi_ibytes;
                        wifi_out += ifa_data->ifi_obytes;
                    }
                    if (strncmp(cursor->ifa_name, "pdp_ip", 6) == 0) {
                        wwan_in += ifa_data->ifi_ibytes;
                        wwan_out += ifa_data->ifi_obytes;
                    }
                }
            }
            cursor = cursor->ifa_next;
        }
        freeifaddrs(addrs);
    }

    return @{
        @"wifi_received": @(wifi_in),
        @"wifi_sent": @(wifi_out),
        @"cellular_received": @(wwan_in),
        @"cellular_sent": @(wwan_out)
    };
}

RCT_EXPORT_METHOD(getMemoryUsage:(RCTPromiseResolveBlock)resolve
                        rejecter:(RCTPromiseRejectBlock)reject)
{
    task_vm_info_data_t vmInfo;
    mach_msg_type_number_t count = TASK_VM_INFO_COUNT;
    kern_return_t kernReturn = task_info(mach_task_self(), TASK_VM_INFO, (task_info_t)&vmInfo, &count);
    
    thread_array_t threadList;
    mach_msg_type_number_t threadCount;
    thread_info_data_t threadInfo;
    mach_msg_type_number_t threadInfoCount;
    
    kern_return_t threadKernReturn = task_threads(mach_task_self(), &threadList, &threadCount);
    
    float totalCPUUsage = 0;
    
    if (threadKernReturn == KERN_SUCCESS) {
        for (int i = 0; i < threadCount; i++) {
            threadInfoCount = THREAD_INFO_MAX;
            kern_return_t threadInfoKernReturn = thread_info(threadList[i], THREAD_BASIC_INFO, (thread_info_t)threadInfo, &threadInfoCount);
            
            if (threadInfoKernReturn == KERN_SUCCESS) {
                thread_basic_info_t threadBasicInfo = (thread_basic_info_t)threadInfo;
                if (!(threadBasicInfo->flags & TH_FLAGS_IDLE)) {
                    totalCPUUsage += threadBasicInfo->cpu_usage / (float)TH_USAGE_SCALE * 100.0;
                }
            }
        }
        
        vm_deallocate(mach_task_self(), (vm_address_t)threadList, threadCount * sizeof(thread_t));
    }

    if (kernReturn == KERN_SUCCESS) {
        NSMutableDictionary *usage = [NSMutableDictionary dictionary];
        [usage setObject:@(vmInfo.phys_footprint) forKey:@"resident_size"];
        [usage setObject:@(vmInfo.virtual_size) forKey:@"virtual_size"];
        [usage setObject:[NSNumber numberWithFloat:totalCPUUsage] forKey:@"cpu_usage"];
        
        [usage addEntriesFromDictionary:[self getNetworkUsage]];
        
        NSLog(@"Usage: %@", usage);  
        
        resolve(usage);
    } else {
        NSError *error = [NSError errorWithDomain:@"MemoryUsageErrorDomain" code:1 userInfo:@{NSLocalizedDescriptionKey: @"Failed to get usage info"}];
        reject(@"usage_error", @"Failed to get usage info", error);
    }
}

@end
