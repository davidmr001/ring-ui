import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dialog from '../dialog/dialog';
import Button from '../button/button';

import styles from './auth-dialog.css';

/**
 * @name Auth Dialog
 * @category Components
 * @framework React
 * @constructor
 * @description A component that shows an authentication dialog.
 * @example-file ./auth-dialog.examples.html
 */

export default class AuthDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    errorMessage: PropTypes.string,
    serviceImage: PropTypes.string,
    serviceName: PropTypes.string,
    loginCaption: PropTypes.string,
    loginToCaption: PropTypes.string,

    show: PropTypes.bool,
    cancelOnEsc: PropTypes.bool,
    loginLabel: PropTypes.string,
    cancelLabel: PropTypes.string,

    onLogin: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    loginCaption: 'Log in',
    loginToCaption: 'Log in to %serviceName%',
    show: false,
    cancelOnEsc: true,
    loginLabel: 'Log in',
    cancelLabel: 'Remain a guest',
    onLogin: () => {},
    onCancel: () => {}
  };

  onEscPress = () => {
    if (this.props.cancelOnEsc) {
      this.props.onCancel();
    }
  };

  render() {
    const {
      show,
      className,
      errorMessage,
      serviceImage,
      serviceName,
      loginCaption,
      loginToCaption,
      loginLabel,
      cancelLabel,
      onLogin,
      onCancel
    } = this.props;

    const defaultTitle = serviceName ? loginToCaption : loginCaption;
    const title = (this.props.title || defaultTitle).replace('%serviceName%', serviceName);

    return (
      <Dialog
        data-test="ring-auth-dialog"
        className={className}
        contentClassName={classNames(className, styles.dialog)}
        onEscPress={this.onEscPress}
        show={show}
      >
        <div className={styles.content}>
          {serviceImage && (
            <img
              className={styles.logo}
              src={serviceImage}
            />
          )}
          <div className={styles.title}>{title}</div>
          {errorMessage && (
            <div className={styles.error}>{errorMessage}</div>
          )}
          <Button
            blue
            className={styles.firstButton}
            data-test="auth-dialog-login-button"
            onClick={onLogin}
          >
            {loginLabel}
          </Button>
          <Button
            className={styles.button}
            data-test="auth-dialog-cancel-button"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
        </div>
      </Dialog>
    );
  }
}

