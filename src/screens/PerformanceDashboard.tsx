import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useMemoryUsage } from '../context/MemoryUsageContext';
import { LineChart, BarChart } from 'react-native-chart-kit';

const PerformanceDashboard = () => {
  const { homeMemoryUsage, profileMemoryUsage } = useMemoryUsage();

  const isComponentHealthy = (cpuUsage, memoryUsage) => {
    const CPU_THRESHOLD = 80;
    const MEMORY_THRESHOLD = 500;

    return cpuUsage < CPU_THRESHOLD && memoryUsage < MEMORY_THRESHOLD;
  };

  const renderStatusMessage = (cpuUsage, memoryUsage) => {
    if (isComponentHealthy(cpuUsage, memoryUsage)) {
      return <Text style={[styles.statusText, styles.healthy]}>Component is working well</Text>;
    } else {
      return <Text style={[styles.statusText, styles.unhealthy]}>Component is slowing down</Text>;
    }
  };

  const data = [
    {
      key: 'home',
      title: 'Home Component',
      usage: homeMemoryUsage,
    },
    {
      key: 'profile',
      title: 'Profile Component',
      usage: profileMemoryUsage,
    },
  ];

  const renderItem = ({ item }) => {
    const { title, usage } = item;

    const memoryData = usage ? [
      { memoryUsage: (usage.resident_size / (1024 * 1024)).toFixed(2), label: 'Memory Usage' },
      { memoryUsage: (usage.virtual_size / (1024 * 1024)).toFixed(2), label: 'Virtual Size' }
    ] : [];

    const cpuData = usage ? [
      { cpuUsage: usage.cpu_usage.toFixed(2), label: 'CPU Usage' }
    ] : [];

    return usage ? (
      <View style={styles.usageContainer}>
        <Text style={styles.componentTitle}>{title}</Text>
        <Text style={styles.usageText}>Memory Usage: {(usage.resident_size / (1024 * 1024)).toFixed(2)} MB</Text>
        <Text style={styles.usageText}>Virtual Size: {(usage.virtual_size / (1024 * 1024)).toFixed(2)} MB</Text>
        <Text style={styles.usageText}>CPU Usage: {usage.cpu_usage.toFixed(2)}%</Text>
        <Text style={styles.usageText}>WiFi Received: {(usage.wifi_received / (1024 * 1024)).toFixed(2)} MB</Text>
        <Text style={styles.usageText}>WiFi Sent: {(usage.wifi_sent / (1024 * 1024)).toFixed(2)} MB</Text>
        <Text style={styles.usageText}>Cellular Received: {(usage.cellular_received / (1024 * 1024)).toFixed(2)} MB</Text>
        <Text style={styles.usageText}>Cellular Sent: {(usage.cellular_sent / (1024 * 1024)).toFixed(2)} MB</Text>
        {renderStatusMessage(usage.cpu_usage, usage.resident_size / (1024 * 1024))}
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <BarChart
            data={{
              labels: memoryData.map(data => data.label),
              datasets: [{ data: memoryData.map(data => parseFloat(data.memoryUsage)) }],
            }}
            width={Dimensions.get('window').width} 
            height={220}
            yAxisSuffix="MB"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,  
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
        <ScrollView horizontal>
          <LineChart
            data={{
              labels: cpuData.map(data => data.label),
              datasets: [{ data: cpuData.map(data => parseFloat(data.cpuUsage)) }],
            }}
            width={Dimensions.get('window').width} 
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
      </View>
    ) : (
      <Text style={styles.usageText}>Fetching {title.toLowerCase()} memory usage...</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Dashboard</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PerformanceDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  usageContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  componentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  usageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  healthy: {
    color: 'green',
  },
  unhealthy: {
    color: 'red',
  },
});
