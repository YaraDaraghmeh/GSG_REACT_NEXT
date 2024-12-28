import React from 'react';
import { BarChart2, CheckSquare, AlertTriangle } from 'lucide-react';
import styles from './TodoData.module.css';

interface TodoDataProps {
  todos: {
    isCompleted: boolean;
    isUrgent: boolean;
  }[];
}

const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  variant 
}: { 
  label: string; 
  value: number; 
  icon: React.ElementType; 
  variant: 'created' | 'completed' | 'urgent';
}) => {
  return (
    <div className={`${styles.statCard} ${styles[variant]}`}>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <Icon />
        </div>
        <div className={styles.textContent}>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export const TodoData: React.FC<TodoDataProps> = ({ todos }) => {
  const created = todos.length;
  const completed = todos.filter((todo) => todo.isCompleted).length;
  const urgent = todos.filter((todo) => todo.isUrgent).length;

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <StatCard
          label="Created Tasks"
          value={created}
          icon={BarChart2}
          variant="created"
        />
        <StatCard
          label="Completed Tasks"
          value={completed}
          icon={CheckSquare}
          variant="completed"
        />
        <StatCard
          label="Urgent Tasks"
          value={urgent}
          icon={AlertTriangle}
          variant="urgent"
        />
      </div>
    </div>
  );
};

export default TodoData;