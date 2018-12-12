export const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    backgroundColor: '#fbfbfbe0',
    opacity: .96,
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit / 2,
  },
  input: {
    margin: '0px'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  register: {
    margin: '15px 0 15px 0',
    float: 'left'
  },
  resetpassword: {
    margin: '15px 0 15px 0',
    float: 'right'
  },
  pointer: {
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});

export default styles; 