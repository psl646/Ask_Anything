var ModalConstants = {
  SIGNUP: {
    overlay : {
      position        : 'absolute',
      height          : '100%',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      backgroundColor : 'transparent',
      zIndex					: 10
    },
    content : {
      position        : 'fixed',
      top             : '75px',
      left            : 0,
      right           : 0,
      bottom          : 0,
      backgroundColor : 'white',
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
      width           : '1340px',
      height          : '2928px',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      marginBottom    : '-5000px',
      paddingBottom   : '5000px',
      opacity         : 0.9,
      backgroundColor : '#303233',
      overflow        : 'hidden',
      zIndex          : 20,
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
      border          : 0,
      borderRadius    : 0,
      zIndex          : 21
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
  }
}

module.exports = ModalConstants;
