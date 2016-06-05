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

  QUESTIONFORM: {
    overlay : {
      position        : 'fixed',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      backgroundColor : 'rgba(18, 18, 15, 0.75)',
      zIndex          : 10
    },
    content : {
      position        : 'fixed',
      top             : '100px',
      left            : '100px',
      right           : '100px',
      bottom          : '100px',
      border          : '1px solid #ccc',
      padding         : '20px',
      zIndex          : 11
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
