const meta = (message, code, status) => {
  const metaData = {
    message,
    code,
    status,
  };
  return metaData;
};

const formatRes = (metaData, data, total, _links) => {
  const apiResponse = {meta: metaData, data, total, _links};
  return apiResponse;
};

module.exports = {meta, formatRes};
