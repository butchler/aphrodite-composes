import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from '../aphrodite-composes';
import styles from './styles';

class Example extends React.Component {
    render() {
        return <div className={css(exampleStyles.container)}>
            <p>This is a button using only shared styles:</p>
            <a className={css(exampleStyles.button)}>Button</a>

            <p>This is a button with some styles that are only used on this component and nowhere else:</p>
            <a className={css(exampleStyles.specialButton)}>Special Button</a>
        </div>;
    }
}

const exampleStyles = StyleSheet.create({
    container: { composes: [styles.baseContainer, styles.primaryDarkBackground, styles.primaryLightColor] },
    button: { composes: [styles.baseButton, styles.largeTopMargin] },
    specialButton: {
        composes: [styles.baseButton],
        color: '#beefee',
    },
});

ReactDOM.render(<Example />, document.getElementById('app-container'));
