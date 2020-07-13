import { createStyles } from '@material-ui/core/styles';

export default () =>
  createStyles({
    overlay: {
      padding: 10,
      backgroundColor: 'beige',
      margin: 10,
      width: '100%',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
