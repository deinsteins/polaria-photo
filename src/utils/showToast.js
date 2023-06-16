import Toast from "../components/toast";

const showToast = (status, title) => {
    Toast.fire({
      icon: `${status}`,
      title: `${title}`,
    });
  };

export default showToast;