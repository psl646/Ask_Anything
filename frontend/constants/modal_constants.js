var ModalConstants = {
  SIGNUP: {
    overlay : {
      position        : 'relative',
      height          : '100%',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      backgroundColor : 'transparent',
      zIndex					: 10,
      border          : 0
    },
    content : {
      position        : 'relative',
      top             : '75px',
      left            : 0,
      right           : 0,
      bottom          : 0,
      backgroundColor : 'white',
      border          : 0,
      zIndex					: 11
    }
  },

  QUESTION_FORM: {
    overlay : {
      WebkitTransition: 'background-color 1s',
      MozTransition: 'background-color 1s',
      OTransition: 'background-color 1s',
      transition: 'background-color 1s',
      display         : 'block',
      position        : 'absolute',
      width           : '100%',
      height          : '2928px',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      marginBottom    : '-5000px',
      paddingBottom   : '5000px',
      opacity         : 0.9,
      backgroundColor : '#161818',
      overflow        : 'hidden',
      zIndex          : 20
    },

    content : {
      display         : 'block',
      position        : 'absolute',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      width           : '700px',
      height          : '100%',
      padding         : 0,
      margin          : 'auto',
      marginTop       : '200px',
      opacity         : 1,
      border          : 0,
      borderRadius    : 0,
      zIndex          : 25
    }
  },

  FORGOT_PASSWORD: {
    overlay : {
      position        : 'fixed',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      background      : 'transparent',
      zIndex          : 10
    },
    content : {
      position        : 'fixed',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      outline         : 'none',
      overflow        : 'none',
      outline         : 'none',
      padding         : 'none',
      border          : 'none',
      margin          : 'none',
      zIndex          : 11
    }
  },

  DELETE_QUESTION: {
    overlay : {
    WebkitTransition: 'background-color 1s',
    MozTransition   : 'background-color 1s',
    OTransition     : 'background-color 1s',
    transition      : 'background-color 1s',
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(15, 15, 15, 0.39)',
    zIndex          : 10
  },
    content : {
      fontSize        : '13px',
      position        : 'fixed',
      width           : '360px',
      height          : '130px',
      top             : 'calc(50% - 80px)',
      left            : 'calc(50% - 200px)',
      border          : '1px solid #ccc',
      padding         : '17px',
      borderRadius    : 0,
      boxShadow       : '0 3px 15px black',
      zIndex          : 11
    }
  }
}

module.exports = ModalConstants;
