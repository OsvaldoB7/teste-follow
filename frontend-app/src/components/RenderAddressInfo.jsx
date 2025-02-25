import PropTypes from 'prop-types';

const RenderAddressInfo = ({ address }) => {
    if (address && typeof address === 'object') {
      return (
        <div>
          {address.logradouro && (
            <p>
              <strong>Logradouro:</strong> {address.logradouro}
            </p>
          )}
          {address.complemento && (
            <p>
              <strong>Complemento:</strong> {address.complemento}
            </p>
          )}
          {address.bairro && (
            <p>
              <strong>Bairro:</strong> {address.bairro}
            </p>
          )}
          {address.localidade && (
            <p>
              <strong>Cidade:</strong> {address.localidade}
            </p>
          )}
          {address.uf && (
            <p>
              <strong>UF:</strong> {address.uf}
            </p>
          )}
        </div>
      );
    }
    return <p className="text-sm text-white">Nenhuma informação de endereço disponível.</p>;
  };
  
  RenderAddressInfo.propTypes = {
    address: PropTypes.object,
  };
  
  export default RenderAddressInfo;