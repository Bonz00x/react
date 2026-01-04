import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Task } from '../database';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, newStatus: string) => void;
}

export default function TaskList({ tasks, onDelete, onUpdateStatus }: TaskListProps) {
  return (
    <View>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Text style={styles.deadline}>Deadline: {task.deadline || 'No deadline'}</Text>
          <Text style={styles.status}>Status: {task.status}</Text>
          
          <View style={styles.buttonRow}>
            <Button 
              title={task.status === 'In Progress' ? 'Mark Complete' : 'Mark In Progress'} 
              onPress={() => onUpdateStatus(task.id, task.status === 'In Progress' ? 'Completed' : 'In Progress')}
              color="#007AFF"
            />
            <Button title="Delete" onPress={() => onDelete(task.id)} color="#ff3b30" />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    color: '#666',
    marginBottom: 5,
    fontSize: 14,
  },
  deadline: {
    color: '#888',
    marginBottom: 5,
    fontSize: 14,
  },
  status: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});