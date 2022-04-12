import {Navbar} from "../molecule/navbar";
import {animated, useTransition} from "react-spring";
import {InfoButton} from "../molecule/infoButton";
import {Questions} from "../atoms/questions";
import {StatementOrder} from "../molecule/statementOrder";
import {LikertScale} from "../atoms/likertScale";
import {ValgomatFooter} from "../molecule/valgomatFooter";
import Backdrop from "@mui/material/Backdrop";
import {ShowExplanation} from "../molecule/showExplanation";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, State} from "../../redux";
import {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {ResultSubDepartment} from "./resultSubDepartment";

interface valgoMatPartTwoProps {
    questionArray: any[]
    isTech?: boolean
    isStrat?: boolean
    isInteractive?: boolean
}

export const ValgomatPartTwo = ({questionArray, isTech, isStrat, isInteractive}: valgoMatPartTwoProps) => {
    const dispatch = useDispatch();
    const {
        increaseCounterPartTwo,
        decreaseCounterPartTwo,
        reset
    } = bindActionCreators(actionCreators, dispatch);
    const counter = useSelector((state: State) => state.questionCounterPartTwo);
    const stratSub = useSelector((state: State) => state.stratSubdivision);
    const interactiveSub = useSelector((state: State) => state.interactiveSubdivision);
    const [transitionValue, setTransitionValue] = useState({from: ''});
    const [transition, setTransition] = useState(true);
    const [className, setClassname] = useState('initializeTransition');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (transition) {
            setTransition(!transition);
            setClassname('initializeTransition');
        }
    }, [counter]);

    useEffect(() => {
        reset();
    }, []);

    const startTransition = useTransition(transition, {
        from: {transform: "translateX(" + transitionValue.from + ")"},
        enter: {transform: "translateX(0)"}
    });

    const handleTransition = (
        isNext: boolean
    ) => {
        if (!isNext) {
            setClassname('animatedDivLeaveNext');
            setTransition(!transition);
            setTimeout((decreaseCounterPartTwo), 200);
            if (!transition) {
                setTransitionValue({from: '-100vw'});
            } else {
                setTransitionValue({from: '100vw'});
            }
        } else {
            setClassname('animatedDivLeaveLast');
            setTransition(!transition);
            setTimeout((increaseCounterPartTwo), 200);
            if (!transition) {
                setTransitionValue({from: '100vw'});
            } else {
                setTransitionValue({from: '-100vw'});
            }
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    for (let questions of questionArray) {
        if (counter === questions.questionNumber) {
            return (
                <div className='bodyValgomat'>
                    <div className={'valgomat'}>
                        <Navbar/>
                        {startTransition((style) =>
                            <animated.div style={style} className={className}>
                                <InfoButton handleClick={handleClick}/>
                                <h1 className='questionNumber'>Spørsmål {counter}</h1>
                                <Questions questionTxt={questions.questionTxt}/>
                                {questions.isStatement ? <StatementOrder questionArray={questionArray} sharedWords={questions.sharedWords}/> :
                                    <LikertScale questionNumber={questions.questionNumber}
                                                 characteristic={questions.characteristic} // This is not characteristic, will be a subdepartment
                                                 isReversed={questions.isReversed}/>}
                            </animated.div>
                        )}
                    </div>
                    <ValgomatFooter completed={questions.progress} nextTransition={handleTransition}/>
                    <Backdrop
                        open={open}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <ShowExplanation questionType={questions.questionType}/>
                    </Backdrop>
                </div>
            )
        }
        if (counter > questionArray.length){
            const information = (isStrat ? stratSub : (isInteractive ? interactiveSub : (isTech ? [] : [])));
            return (<ResultSubDepartment information={information}/>)
        }
    }

    return null;
};