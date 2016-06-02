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
  }
}

module.exports = ModalConstants;
