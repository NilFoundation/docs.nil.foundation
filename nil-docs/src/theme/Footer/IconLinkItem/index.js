import React from 'react';
import styles from './styles.module.css';

export default function IconLinkItem({ source, onIconClick }) {
    return (
        <div onClick={onIconClick}>
            <div className={styles.socialButton}>
                <img src={source}></img>
            </div>
        </div>
    );
}