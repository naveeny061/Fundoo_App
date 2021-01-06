import React from 'react';
import './createNotes.css';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

export default function createNotes() {
    return(
        <div className='notes'>
                Take a note
                <IconButton><CheckBoxOutlinedIcon /></IconButton>
                <IconButton> <BrushIcon /></IconButton>
                <IconButton> <ImageOutlinedIcon /></IconButton>
        </div>
    );
}