import { create } from "zustand";

export const useInterviewStore = create((set, get) => ({
  resumeText: "",
  questions: [],
  answers: {},
  evaluations: {},
  interviewStarted: false,
  loading: false,
  error: "",

 
  setResumeText: (text) => set({ resumeText: text }),
  setQuestions: (questions) => set({ questions }),
  setAnswer: (index, answer) =>
    set((state) => ({
      answers: { ...state.answers, [index]: answer },
    })),
  setEvaluation: (index, evaluation) =>
    set((state) => ({
      evaluations: { ...state.evaluations, [index]: evaluation },
    })),
  setInterviewStarted: (val) => set({ interviewStarted: val }),
  setLoading: (val) => set({ loading: val }),
  setError: (msg) => set({ error: msg }),

 
  resetInterview: () =>
    set({
      questions: [],
      answers: {},
      evaluations: {},
      interviewStarted: false,
      error: "",
    }),
}));
