import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { openDatabase, Task } from './database';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'status' | 'deadline' | 'title'>('title');

  useEffect(() => {
    (async () => {
      try {
        const database = await openDatabase();
        setDb(database);
        await loadTasks(database);
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    })();
  }, []);

  async function loadTasks(database: SQLite.SQLiteDatabase) {
    try {
      const results = await database.getAllAsync<Task>('SELECT * FROM tasks');
      setTasks(results);
    } catch (error) {
      console.error('Load tasks error:', error);
    }
  }

  async function addTask(task: { title: string; description: string; status: string; deadline: string }) {
    if (!db) return;
    try {
      await db.runAsync(
        'INSERT INTO tasks (title, description, status, deadline) VALUES (?, ?, ?, ?)',
        [task.title, task.description, task.status, task.deadline]
      );
      await loadTasks(db);
    } catch (error) {
      console.error('Add task error:', error);
    }
  }

  async function deleteTask(id: number) {
    if (!db) return;
    try {
      await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      await loadTasks(db);
    } catch (error) {
      console.error('Delete task error:', error);
    }
  }

  async function updateTaskStatus(id: number, newStatus: string) {
    if (!db) return;
    try {
      await db.runAsync('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, id]);
      await loadTasks(db);
    } catch (error) {
      console.error('Update status error:', error);
    }
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSortedTasks = () => {
    const tasksToSort = [...filteredTasks];
    
    switch (sortBy) {
      case 'status':
        return tasksToSort.sort((a, b) => a.status.localeCompare(b.status));
      case 'deadline':
        return tasksToSort.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline.localeCompare(b.deadline);
        });
      case 'title':
      default:
        return tasksToSort.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>📝 My Tasks</Text>
          <Text style={styles.subtitle}>Total: {tasks.length} tasks</Text>
        </View>

        <TaskForm onSubmit={addTask} />

        <TextInput
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <Button title="Status" onPress={() => setSortBy('status')} />
            <Button title="Deadline" onPress={() => setSortBy('deadline')} />
            <Button title="Title" onPress={() => setSortBy('title')} />
          </View>
        </View>

        {getSortedTasks().length > 0 ? (
          <TaskList 
            tasks={getSortedTasks()} 
            onDelete={deleteTask} 
            onUpdateStatus={updateTaskStatus} 
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks found!</Text>
            <Text style={styles.emptySubtext}>{searchQuery ? 'Try a different search' : 'Add your first task'}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  sortContainer: {
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
  },
});