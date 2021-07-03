function Error({ statusCode, err }) {
    return (
      <p className="alert alert-danger">
        {statusCode
            ? `An error ${statusCode} occurred on server`
            : `An error occurred on client: ${err}`}
      </p>
    )
}
  
Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    console.error('nextjs error', err);
    return { statusCode, err }
};

export default Error;
