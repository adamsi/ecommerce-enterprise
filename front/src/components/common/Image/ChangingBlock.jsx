import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Skeleton, TextField, IconButton as MuiIconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { FormContent, InputBlock, InputField, InputIcon, InputWrapper, Title } from '../../utils/GeneralComponents/GeneralComponents';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { TbFileDescription } from 'react-icons/tb';
import { editConfig, getConfig } from '../../../features/dynamicContent/dynamicContentSlice';
import { BsPlus } from 'react-icons/bs';
import { ErrorMessage } from '../AdminForm/AdminForm';
import { FaImages } from 'react-icons/fa';
import { RiCheckFill, RiUploadCloudLine } from 'react-icons/ri';
import CustomButton from '../../utils/Button/Button';
import { showToast } from '../../../features/toast/toastSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


export const configValidationSchema = Yup.object().shape({
  images: Yup.array()
  .of(Yup.mixed().required("Each image is required"))
  .notRequired(),
  contents: Yup.array()
  .of(Yup.mixed().required("Each content is required"))
  .notRequired()
});


const ChangingBlock = ({
   configKey,
  children,
  editIconPosition = 'center', // 'center', 'top-left', 'top-right', etc.,
  isOnClick = true
}) => {


  const [buttonsActive, setButtonsActive] = useState(true);
  const dispatch = useDispatch();
  const {configMap, loading} = useSelector((state)=> state.config);

     useEffect( ()=> {
     const fetchConfig = async () => {
       if (configKey) {
         const result = await dispatch(getConfig(configKey));
       }      
     };

     fetchConfig();
     
   }, [dispatch]);

   // Sync contents when configMap changes
   useEffect(() => {
     if (configMap[configKey]) {
       setContents(configMap[configKey].contents || []);
     }
   }, [configMap, configKey]);




  const formikConfig = useFormik({
    initialValues: {
      key: configKey || "",
      contents: configMap[configKey]?.contents || [],
      images: configMap[configKey]?.images || []
    },
    validationSchema: configValidationSchema,
         onSubmit: async (values) => {
       setButtonsActive(false);
       const result = await dispatch(editConfig(values));
       setButtonsActive(true);

  
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(showToast({ message: "Config update success", type: "success" }));
      } else {
        dispatch(showToast({ message: "Config update failed", type: "error" }));
      }
    },
  });


         const [contents, setContents] = useState(configMap[configKey]?.contents || []);
  const [contentInput, setContentInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const contentsInputRef = useRef(null);

const addContent = () => {
  if (contentInput.trim()) {
    setContents([...contents, contentInput.trim()]);
    formikConfig.setFieldValue("contents", [...contents, contentInput.trim()]);
    setContentInput("");
    contentsInputRef.current?.focus();
  }
};

const handleContentKeyDown = (e) => {
  if (e.key === "Enter") {
      e.preventDefault();
      addContent();
  }
};

const removeContent = (index) => {
  const updatedContents = contents.filter((_, i) => i !== index);
  setContents(updatedContents);
  formikConfig.setFieldValue("contents", updatedContents);
};

const startEditing = (index, value) => {
  setEditingIndex(index);
  setEditingValue(value);
};

const saveEdit = () => {
  if (editingValue.trim()) {
    const updatedContents = [...contents];
    updatedContents[editingIndex] = editingValue.trim();
    setContents(updatedContents);
    formikConfig.setFieldValue("contents", updatedContents);
  }
  setEditingIndex(null);
  setEditingValue("");
};

const cancelEdit = () => {
  setEditingIndex(null);
  setEditingValue("");
};

const handleDragEnd = (result) => {
  if (!result.destination || result.source.index === result.destination.index) return;

  const items = Array.from(contents);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  // Update both states in a single batch to reduce re-renders
  setContents(items);
  formikConfig.setFieldValue("contents", items);
};


const handleImagesChange = (event) => {
  const files = Array.from(event.target.files);
  formikConfig.setFieldValue("images", [...formikConfig.values.images, ...files]);
};

const removeImage = (index) => {
  formikConfig.setFieldValue(
    "images",
    formikConfig.values.images.filter((_, i) => i !== index)
  );
};


  const {isAdmin} = useSelector((state)=> state.auth);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

     const handleCloseModal = () => {
     setIsModalOpen(false);
   };

   const handleBackdropClick = (event) => {
     if (event.target === event.currentTarget) {
       setIsModalOpen(false);
     }
   };
  return (
    <div
      onMouseEnter={isAdmin ? () => setIsHovered(true) : undefined}
      onMouseLeave={isAdmin ? () => setIsHovered(false) : undefined}
      onClick={ isAdmin ? (() => isOnClick ? handleOpenModal() : {}) : undefined}
    >
      {children}
      
      {isAdmin && isHovered && (
        <IconButton
          onClick={()=> setIsModalOpen(true)}
          sx={{
            position: 'absolute',
            ...(editIconPosition === 'center' && {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }),
            ...(editIconPosition === 'top-left' && {
              top: '10px',
              left: '10px',
            }),
            ...(editIconPosition === 'top-right' && {
              top: '10px',
              right: '10px',
            }),
            background: 'rgba(255,255,255,0.9)',
            zIndex: 100,
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
      )}

<Dialog

open={isModalOpen}
onClose={handleCloseModal}
disableEscapeKeyDown={false}
onClick={handleBackdropClick}
PaperProps={{
  sx: {
    width: '50%',          // Custom width

  },
}}
>
<DialogTitle sx={{ 
  display: 'flex', 
  justifyContent: 'end', 
  alignItems: 'center',
  padding: '8px 24px 0px 24px'
}}>
 
     <IconButton
     onClick={(e) => {
       e.stopPropagation();
       handleCloseModal();
     }}
     sx={{ 
       color: 'gray',
       '&:hover': {
         backgroundColor: 'rgba(0, 0, 0, 0.04)'
       }
     }}
   >
     <CloseIcon />
   </IconButton>
</DialogTitle>
<DialogContent onClick={(e) => e.stopPropagation()}>
 

<form onSubmit={(e)=> {
            e.preventDefault();
          formikConfig.handleSubmit();
             
          }}>



<FormContent key="config">
<Grid container spacing={3}>
<Grid item xs={12} md={12}>



        



          </Grid>

          <Grid item xs={12} md={12}>




<Title>{"Contents"}</Title>
                     <InputBlock>
        
             
             <Box sx={{ marginTop: 2 }}>
               <DragDropContext onDragEnd={handleDragEnd}>
                 <Droppable droppableId="contents">
                   {(provided) => (
                     <Box
                       {...provided.droppableProps}
                       ref={provided.innerRef}
                       sx={{ minHeight: "50px" }}
                     >
                                               {contents.map((content, index) => (
                          <Draggable key={`content-${content}-${index}`} draggableId={`content-${index}`} index={index}>
                           {(provided, snapshot) => (
                             <Box
                               ref={provided.innerRef}
                               {...provided.draggableProps}
                                                               sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  padding: 2,
                                  margin: "8px 0",
                                  background: snapshot.isDragging ? "var(--primary-color-light-7)" : "var(--primary-color-light-8)",
                                  borderRadius: "var(--border-radius-small)",
                                  border: "2px solid var(--primary-color-dark-2)",
                                  boxShadow: snapshot.isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
                                  transition: snapshot.isDragging ? "none" : "all 0.2s ease",
                                  cursor: snapshot.isDragging ? "grabbing" : "grab",
                                  transform: snapshot.isDragging ? snapshot.transform : "none",
                                }}
                             >
                               <Box {...provided.dragHandleProps} sx={{ cursor: "grab" }}>
                                 <DragIndicatorIcon color="action" />
                               </Box>
                               
                               {editingIndex === index ? (
                                 <Box sx={{ flex: 1, display: "flex", gap: 1, alignItems: "center" }}>
                                                                       <TextField
                                      fullWidth
                                      size="small"
                                      multiline
                                      minRows={2}
                                      maxRows={6}
                                      value={editingValue}
                                      onChange={(e) => setEditingValue(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && e.ctrlKey) {
                                          e.preventDefault();
                                          saveEdit();
                                        } else if (e.key === "Escape") {
                                          cancelEdit();
                                        }
                                      }}
                                      autoFocus
                                    />
                                                                       <MuiIconButton 
                                      size="small" 
                                      onClick={saveEdit}
                                      sx={{ 
                                        color: "green",
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                          backgroundColor: "transparent"
                                        }
                                      }}
                                    >
                                      ✓
                                    </MuiIconButton>
                                    <MuiIconButton 
                                      size="small" 
                                      onClick={cancelEdit}
                                      sx={{ 
                                        color: "red",
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                          backgroundColor: "transparent"
                                        }
                                      }}
                                    >
                                      ✕
                                    </MuiIconButton>
                                 </Box>
                               ) : (
                                 <>
                                   <Box sx={{ flex: 1, cursor: "pointer" }} onClick={() => startEditing(index, content)}>
                                     {content}
                                   </Box>
                                   <MuiIconButton 
                                     size="small" 
                                     onClick={() => startEditing(index, content)}
                                     sx={{ color: "blue" }}
                                   >
                                     <EditIcon fontSize="small" />
                                   </MuiIconButton>
                                   <MuiIconButton 
                                     size="small" 
                                     onClick={() => removeContent(index)}
                                     sx={{ color: "red" }}
                                   >
                                     <DeleteIcon fontSize="small" />
                                   </MuiIconButton>
                                 </>
                               )}
                             </Box>
                           )}
                         </Draggable>
                       ))}
                       {provided.placeholder}
                     </Box>
                   )}
                 </Droppable>
               </DragDropContext>
             </Box>
             
             <ErrorMessage touched={formikConfig.touched.contents} error={formikConfig.errors.contents} />
           </InputBlock>

<br />
<Title>{"Images"}</Title>
           <InputBlock>
        <InputWrapper>
          <InputIcon>
            <FaImages />
          </InputIcon>

          {/* Hidden file input for multiple Images */}
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            multiple
            style={{ display: "none" }}
            onChange={handleImagesChange}
          />

          <label
            htmlFor="imageUpload"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500",
              color: "#333",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            {formikConfig.values.images.length > 0 ? (
              <>
                {formikConfig.values.images.length} image(s) uploaded
                <RiCheckFill fontSize="22px" color="green" />
              </>
            ) : (
              <>
                <RiUploadCloudLine color="gray" />
                Upload Images
              </>
            )}
          </label>
        </InputWrapper>

        {/* Display uploaded images */}
        <Box sx={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: 1 }}>
          {formikConfig.values.images.map((image, index) => (
            <Box
              key={index}
              sx={{
                padding: "4px",
                background: "#f0f0f0",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => removeImage(index)}
            >
              <img
                src={(image instanceof File) ? URL.createObjectURL(image): image} 
                alt="Image"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ×
              </span>
            </Box>
          ))}
        </Box>

        {/* Validation message for images */}
        {formikConfig.touched.images && formikConfig.errors.images && (
          <RiErrorWarningLine fontSize={"22px"} color="red" />
        )}
      </InputBlock>







        
</Grid>

<Grid item xs={12} md={6}>
<CustomButton
            type="submit"
              size="small"
              color="var(--primary-color-dark-2)"
              $invert={true}
              active={buttonsActive}
            >
              Create
            </CustomButton>
            <span>{loading[configKey] ? <CircularProgress sx={{marginLeft:'15px'}} size={'20px'} color="inherit" />: null}</span>
    </Grid>
          
            </Grid>
          </FormContent>








            </form>






</DialogContent>
</Dialog>
    </div>
  );
};

ChangingBlock.propTypes = {
  children: PropTypes.node,
  configKey:PropTypes.string
};

export default ChangingBlock;
