import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, State} from "../../redux";
import '../../styles/alertDialogFunction.style.css';
import {Result} from "../organisms/result";
import {useState} from "react";
import {Link} from "react-router-dom";
interface alertDialogProps {
    end : boolean
    backToResult ?: boolean
    totalPointsArray ?: number[]
    setIsDepClicked ?: React.Dispatch<React.SetStateAction<{ strat: boolean; interactive: boolean; tech: boolean; }>>
    setBackToResult ?: React.Dispatch<React.SetStateAction<boolean>>;
    currentDep ?: string
}

export const AlertDialog = ({
    end,
    backToResult,
    totalPointsArray,
    setIsDepClicked,
    setBackToResult,
    currentDep
}: alertDialogProps) => {
    const pointsArray = totalPointsArray;
    const dispatch = useDispatch();
    const {increaseCounter, decreaseCounter, showAlertDialog, increaseCounterPartTwo, resetStratSubDivision, resetIntSubDivision, subValgomatIsInProgress, setCounterPartTwo} = bindActionCreators(actionCreators, dispatch);
    const [update, setUpdate] = useState(false);
    const counter = useSelector((state: State) => state.questionCounter);
    const counterPartTwo = useSelector((state: State) => state.questionCounterPartTwo);
    const isInfo = useSelector((state: State) => state.isInfoClicked);
    const subValgomatInProgress = useSelector((state: State) => state.subValgomatInProgress);
    const isShowAlertDialog = useSelector((state: State) => state.showAlertDialog);

    const handleClose = () => {
        if (counter === 0) {
            increaseCounter();
        } else if(counterPartTwo === 0) {
            increaseCounterPartTwo();
        }
        showAlertDialog(false);
        if (setBackToResult) {
            setBackToResult(false);
        }
    };

    const handleDecrease = () => {
        if (counterPartTwo !== 0){
            decreaseCounter();
        } else {
            increaseCounterPartTwo();
        }
    };

    if(update && pointsArray !== undefined) {
        if (counterPartTwo === 0 && setIsDepClicked){
            increaseCounterPartTwo();
            setIsDepClicked({ strat: false, interactive: false, tech: false})
        }
        return (
            <Result totalPointsArray={pointsArray}/>
        )
    }

    const handleBackToResult = () => {
        if (counterPartTwo === 0 && setIsDepClicked){
            console.log('skal inn hit')
            increaseCounterPartTwo();
            if (currentDep === 'strat') {
                resetStratSubDivision();
            } else if (currentDep === 'int') {
                resetIntSubDivision();
            } else if (currentDep === 'tech') {
                console.log('add reset tech states here');
            }
            subValgomatIsInProgress(false);
            setIsDepClicked({ strat: false, interactive: false, tech: false})
        } else if (subValgomatInProgress && isShowAlertDialog) {
            setCounterPartTwo(1);
            subValgomatIsInProgress(false);
        } else if (setBackToResult) {
            setCounterPartTwo(1);
            setBackToResult(false);
            subValgomatIsInProgress(false);
            if (setIsDepClicked) {
                setIsDepClicked({strat: false, interactive: false, tech: false})
            }
        }
    }

    if(backToResult) {
        return (
            <div data-testid={'endAlertDialog'}>
                <Dialog
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Tilbake til resultatsiden?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" data-testid={'endDialogText'}>
                            Er du sikker på at du vil gå tilbake til resultatsiden?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <a className='alertButton' onClick={() => handleClose()}>Nei</a>
                        <a data-testid={'yesButton'} className='alertButton' onClick={() => {handleBackToResult()}}>Ja</a>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    if (end) {
        return (
            <div data-testid={'endAlertDialog'}>
                <Dialog
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Fullføre valgomaten?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" data-testid={'endDialogText'}>
                            Er du sikker på at du vil fullføre valgomaten?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <a className='alertButton' onClick={() => handleDecrease()}>Nei</a>
                        <a data-testid={'yesButton'} className='alertButton' onClick={() => {setUpdate(true)}}>Ja</a>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
            <div data-testid={'progressAlertDialog'}>
                <Dialog
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Avslutte valgomaten?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" data-testid={'progressDialogText'}>
                            Er du sikker på at du vil avslutte valgomaten?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <a className='alertButton' onClick={handleClose}>Nei</a>
                        {isInfo ? <Link className='alertButton' to='/info'>Ja</Link> : <a className='alertButton' href='/'>Ja</a>}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};
