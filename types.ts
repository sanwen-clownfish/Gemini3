export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface WorkoutExercise {
  name: string;
  description: string;
  rating: number; // 1-10
  difficulty: string;
  reps: string;
}

export interface MuscleInfo {
  id: string; // Internal ID for 3D model mapping
  name: string; // Display name
  description: string;
}

export type MuscleId = 
  // Chest (Pecs)
  | 'upper_chest'   // Clavicular
  | 'middle_chest'  // Sternal
  | 'lower_chest'   // Costal/Abdominal
  | 'outer_chest'   // Outer edge defining width
  
  // Back
  | 'traps'       
  | 'lats'        
  | 'rhomboids'   
  | 'teres'       
  | 'lower_back'  
  
  // Shoulders (Delts)
  | 'front_delt'
  | 'side_delt'
  | 'rear_delt'
  
  // Arms - Biceps
  | 'biceps_long'   // Outer head
  | 'biceps_short'  // Inner head
  | 'brachialis'    // Side muscle pushing bicep up

  // Arms - Triceps
  | 'triceps_long'  // Inner thick head
  | 'triceps_lateral' // Outer horseshoe head
  
  | 'forearms' 
  
  // Core
  | 'abs_upper' 
  | 'abs_lower'
  | 'obliques'
  
  // Legs
  | 'quads' 
  | 'hamstrings' 
  | 'calves' 
  | 'glutes'
  
  // Misc
  | 'head';
