
export const searchByValue = (valueToSearch: string, options: {value: string, label: string}[]) => {
    const foundOption = options.find(option => option.value === valueToSearch);
    return foundOption ? foundOption.label : 'Опция не найдена';
};

export const searchByLabel = (labelToSearch: string, options: {value: string, label: string}[]) => {
    const foundOption = options.find(option => option.value === labelToSearch);
    return foundOption ? foundOption.value : 'Опция не найдена';
};
 