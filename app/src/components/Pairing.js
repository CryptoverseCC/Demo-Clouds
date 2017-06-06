import { connect } from 'react-redux';
import PairingView from 'App/components/Pairing.v';
import { pairingSubmit } from 'App/actions';

const mapStateToProps = (state) => ({
  profile: state.profile,
  keys: state.keys,
  pairing: state.pairing
});

const mapDispatchToProps = (dispatch) => {
  return {
    pairingSubmit: (target) => {
      dispatch(pairingSubmit(target));
    }
  }
}

const Pairing = connect(mapStateToProps, mapDispatchToProps)(PairingView);

export default Pairing;
