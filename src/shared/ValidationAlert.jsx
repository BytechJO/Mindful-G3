import Swal from "sweetalert2";
import './ValidationAlert.css';
import good from "./assets/goodjob1.gif";
import wrong from "./assets/wrong.gif";
import Notice from "./assets/Notice.gif";
import questionGif from "./assets/question.gif";

const ValidationAlert = {
  success: (title = "Good Job!", text = "", scoreText = "", onConfirm = null) => {
    return Swal.fire({
      title: title,
      html: `
          <p>${text}</p>
          ${scoreText ? `<h3 style="color:green; margin-top:10px;">Score: ${scoreText}</h3>` : ""}
        `,
      imageUrl: good,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Question GIF",
      background: "#dfeaf6",
      confirmButtonText: 'Continue',
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button",
      },
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
    });
  },

  error: (title = "You can do it!", text = "", scoreText = "", onConfirm = null) => {
    return Swal.fire({
      title: title,
      html: `
          <p>${text}</p>
          ${scoreText ? `<h3 style="color:red; margin-top:10px;">Score: ${scoreText}</h3>` : ""}
        `,
      imageUrl: wrong,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Question GIF",
      confirmButtonText: 'Try Again',
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      confirmButtonColor: '#f44336',
      background: "#dfeaf6",
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button1",
      },
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
    });
  },

  info: (title = "Notice", text = "", onConfirm = null) => {
    return Swal.fire({
      title: title,
      html: `<p>${text}</p>`,
      imageUrl: Notice,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Notice GIF",
      background: "#dfeaf6",
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button2",
      },
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
    });
  },
  storyEnd: (onConfirm = null) => {
    return Swal.fire({
      title: "Good Job!",
      html: "You finished the story. Go to the quiz?",
      imageUrl: questionGif,
      imageWidth: 200,
      imageHeight: 200,
      background: "#dfeaf6",
      confirmButtonText: '<i class="fa-solid fa-right-long"></i>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button",
      },
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
    });
  },
};

export default ValidationAlert;
