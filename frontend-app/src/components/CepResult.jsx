import PropTypes from 'prop-types';

const CepResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Resultado do CEP: {result.cep}
      </h2>
      <div className="text-sm text-white space-y-1">
        {result.logradouro && (
          <p>
            <strong>Logradouro:</strong> {result.logradouro}
          </p>
        )}
        {result.complemento && (
          <p>
            <strong>Complemento:</strong> {result.complemento}
          </p>
        )}
        {result.bairro && (
          <p>
            <strong>Bairro:</strong> {result.bairro}
          </p>
        )}
        {result.localidade && (
          <p>
            <strong>Cidade:</strong> {result.localidade}
          </p>
        )}
        {result.uf && (
          <p>
            <strong>UF:</strong> {result.uf}
          </p>
        )}
      </div>
    </div>
  );
};

CepResult.propTypes = {
  result: PropTypes.object,
};

export default CepResult;