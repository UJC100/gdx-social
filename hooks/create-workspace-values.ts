import { create } from "zustand";

type CreateWorkspaceValues = {
    name: string;
    imageurl: string;
    updateImageurl: (url: string) => void;
    updateValues: (values: Partial<CreateWorkspaceValues>) => void;
    currStep: number;
    setCurrStep: (step: number) => void
}

export const  UseCreateWorkspaceValues = create<CreateWorkspaceValues>(set => ({
    name: '',
    imageurl: '',
    updateImageurl: url => set({imageurl: url}),
    updateValues: values => set(values),
    currStep: 1,
    setCurrStep: step => set({currStep: step})
}))