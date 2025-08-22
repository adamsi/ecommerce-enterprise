import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../ApolloClient";
import { initialConfigMap } from "../../data/configData";

//
// GraphQL Queries & Mutations
//

const GET_CONFIG = gql`
  query GET_CONFIG($key: String!) {
    clientConfig(key: $key) {
      key
      contents
      images
    }
  }
`;

const EDIT_CONFIG = gql`
  mutation editClientConfig($input: ClientConfigInput!, $images: [Upload]) {
    editClientConfig(input: $input, images: $images) {
      key
      contents
      images
    }
  }
`;

//
// Thunks
//

 const getConfig = createAsyncThunk(
  "config/getConfig",
  async (key, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_CONFIG,
        variables: { key },
        fetchPolicy: "no-cache",
      });
      return { key, data: data.clientConfig };
    } catch (error) {
      return rejectWithValue({ key, error: error.message });
    }
  }
);

 const editConfig = createAsyncThunk(
  "config/editConfig",
  async (formData, { rejectWithValue }) => {
  
    try {
      const { data } = await client.mutate({
        mutation: EDIT_CONFIG,
        variables: {
          input:
          {  key: formData.key,
             images: (Array.isArray(formData.images) && formData.images.every(item => typeof item === 'string')) ? formData.images : null,
            contents: formData.contents
          },
          images: (Array.isArray(formData.images) && formData.images.every(item => item instanceof File)) ?formData.images: null
        },
        context: {
            useMultipart: true,
          },
          fetchPolicy: "no-cache"
      });
      return { key: data.editClientConfig.key, data: data.editClientConfig };
    } catch (error) {
      return rejectWithValue({
        key: formData.key,
        error: error.message,
      });
    }
  }
);

//
// Slice
//

const configSlice = createSlice({
  name: "config",
  initialState: {
    configMap: initialConfigMap, // Initialize with hardcoded data
    loading: {},   // { [key]: boolean }
    error: {},     // { [key]: string | null }
  },
  reducers: {
    setClientConfig: (state, action) => {
      const { key, contents = [], images = [] } = action.payload;
      state.configMap[key] = { contents, images };
    },
    resetError: (state, action) => {
      const key = action.payload;
      if (key) state.error[key] = null;
      else state.error = {};
    },
    resetLoading: (state, action) => {
      const key = action.payload;
      if (key) state.loading[key] = false;
      else state.loading = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getConfig.pending, (state, action) => {
        const key = action.meta.arg;
        state.loading[key] = true;
        state.error[key] = null;
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.loading[key] = false;
        state.configMap[key] = {
          contents: data.contents || [],
          images: data.images || [],
        };
      })
      .addCase(getConfig.rejected, (state, action) => {
        const { key, error } = action.payload;
        state.loading[key] = false;
        state.error[key] = error;
      })

      // EDIT
      .addCase(editConfig.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.loading[key] = true;
        state.error[key] = null;
      })
      .addCase(editConfig.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.loading[key] = false;
        state.configMap[key] = {
          contents: data.contents || [],
          images: data.images || [],
        };
      })
      .addCase(editConfig.rejected, (state, action) => {
  
        const { key, error } = action.payload;
        state.loading[key] = false;
        state.error[key] = error;
      });
  },
});

//
// Exports
//

export const {
  setClientConfig,
  resetError,
  resetLoading,
} = configSlice.actions;

export { getConfig, editConfig };

export default configSlice.reducer;
