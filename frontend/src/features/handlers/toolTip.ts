import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {PatternProps, ValidTooltipResult} from '../../app/types'

interface ToolTip {
  isValid: boolean;
  patterns: PatternProps[];
  value: string;
  results: ValidTooltipResult[];
}

const initialState: ToolTip = {
  isValid: false,
  patterns: [],
  value: '',
  results: [],
};

const checkPattern = (value: string, pattern: RegExp): Promise<boolean> => {
  return new Promise((resolve) => {
    const isMatch = pattern.test(value);
    resolve(isMatch);
  });
};

export const validatePatterns = createAsyncThunk(
  'toolTip/validatePatterns',
  async (payload: { value: string; patterns: PatternProps[], inputName: string }) => {
    const { value, patterns, inputName  } = payload;
    const results = await Promise.all(patterns.map((pattern) => checkPattern(value, pattern.pattern)));
    return {results, inputName};
  }
);

export const toolTip = createSlice({
  name: 'toolTip',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(validatePatterns.pending, (state, action) => {
        console.log(action.payload)
      });
    builder.addCase(validatePatterns.fulfilled, (state, action) => {
        const { results, inputName } = action.payload;

        // Ищем индекс объекта с соответствующим inputName
        const indexToUpdate = state.results.findIndex((item) => item.inputName === inputName);
      
        if (indexToUpdate !== -1) {
          // Обновляем valid для найденного объекта
          state.results[indexToUpdate].valid = results;
        } else {
          // Если объект с inputName не найден, добавляем новый
          state.results.push({
            inputName: inputName,
            valid: results
          });
        }
    });
    builder.addCase(validatePatterns.rejected, (state, action) => {
        console.log(action.payload)
      });
  },
});

const toolTipReducer = toolTip.reducer;
export default toolTipReducer;

const toolTipResults = (state: RootState) => state.toolTipReducer.results;
export { toolTipResults };
