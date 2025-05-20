type ErrorFallbackProps = {
  error: Error;
};

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div>
      <p>오류가 발생했습니다:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
