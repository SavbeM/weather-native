import React, {PropsWithChildren, useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

type ErrorAnimationProps = PropsWithChildren;

export const ErrorAnimation: React.FC<ErrorAnimationProps> = (props) => {
    const errorImageOpacity = useRef(new Animated.Value(0)).current;
    const errorImagePosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeInAnimation = Animated.timing(errorImageOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        });

        const vibrationAnimation =
                Animated.sequence([
                    Animated.timing(errorImagePosition, {
                        toValue: -10,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(errorImagePosition, {
                        toValue: 10,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(errorImagePosition, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])

            fadeInAnimation.start()
            setInterval(() => {
                    vibrationAnimation.reset()
                    vibrationAnimation.start()
                }
                , 2000)

    }, [errorImageOpacity, errorImagePosition]);


    return (
        <Animated.View
            style={{
                opacity: errorImageOpacity,
                transform: [{translateX: errorImagePosition}],
            }}
        >
            {props.children}
        </Animated.View>
    );
};
