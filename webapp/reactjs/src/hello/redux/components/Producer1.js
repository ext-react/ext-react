import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Label, TextField } from 'lib/modules';
import { updateName, resetBadName } from '../actions';
import { useSnackbar } from 'notistack';

const ConnectedProducer1 = props => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(props.badName) {
            enqueueSnackbar(`Bad name: ${props.badName}`);
            props.resetBadName();
        }
    });

    const onNameChange = (field, value) => {
        props.updateName(value);
    };

    // console.log('Producer1');
    return(
        <>
            <Container layout='hbox'>
                <Label
                    flex={1}
                    text='Change Name:'
                />

                <TextField
                    flex={1}
                    onChange={onNameChange}
                />
            </Container>

            <div className='spacer'/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        badName: state.badName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => { dispatch(updateName(name)); },
        resetBadName: (name) => { dispatch(resetBadName(name)); }
    };
};

export const Producer1 = connect(mapStateToProps, mapDispatchToProps)(ConnectedProducer1);