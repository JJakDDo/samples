export function errorHandler(error, msg) {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400: {
        alert(msg || "Bad Request");
        break;
      }
      case 401: {
        alert("No authorization");
        break;
      }
      case 404: {
        alert("Page Not Found");
        break;
      }
      case 500: {
        alert("Server Error!");
        break;
      }
      default: {
        break;
      }
    }
  } else if (error.request) {
    alert(error.request);
  } else {
    alert(error.message);
  }
}
