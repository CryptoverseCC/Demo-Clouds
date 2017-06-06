import { connect } from 'react-redux';
import ExportView from 'App/components/Export.v';
import { importKeys } from 'App/actions';

const mapStateToProps = (state) => ({
  keys: state.keys,
});

const mapDispatchToProps = (dispatch) => {
  return {
    import: (keys) => {
      dispatch(importKeys(keys));
    }
  }
}

const Export = connect(mapStateToProps, mapDispatchToProps)(ExportView);

export default Export;
