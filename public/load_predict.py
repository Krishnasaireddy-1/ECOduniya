# import tkinter as tk
# from tkinter import Label, Button, messagebox, Frame
# import cv2
# from PIL import Image, ImageTk
# import numpy as np
# import torch
# from torchvision.transforms import transforms
# import torchvision.models as models
# from torch.nn import Linear
# import serial
#
#
# class WasteClassificationApp:
#     def __init__(self, root, video_source):
#         self.root = root
#         self.root.title("Waste Classification from Live Feed")
#         self.root.geometry("900x800")  # Increased window size
#
#         # Initialize serial communication
#         try:
#             self.ser = serial.Serial()
#             self.ser.port = 'COM4'
#             self.ser.baudrate = 9600
#             self.ser.close()
#             self.ser.open()
#         except Exception as e:
#             messagebox.showwarning("Serial Connection", f"Could not open serial port: {e}")
#             self.ser = None
#
#         # Define device
#         self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#
#         # Define transformations for input images
#         self.tfm = transforms.Compose([
#             transforms.Resize((224, 224)),
#             transforms.ToTensor(),
#             transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
#         ])
#
#         # Load the trained model
#         try:
#             self.model = models.resnet34(pretrained=True)
#             self.model.fc = Linear(in_features=512, out_features=6)
#             self.model.load_state_dict(torch.load(r'C:\Users\seeta\PycharmProjects\BigDeal\Models\bestmodel.pth'))
#             self.model.eval()
#             self.model.to(self.device)
#         except Exception as e:
#             messagebox.showerror("Model Loading", f"Could not load model: {e}")
#             self.model = None
#
#         # Mapping predictions to categories
#         self.categories = [
#             "E-Waste",
#             "Food Waste",
#             "Leaf Waste",
#             "Medical Waste",
#             "Metal",
#             "Plastic"
#         ]
#
#         # Video capture
#         self.vid = cv2.VideoCapture(video_source)
#
#         # Set video capture resolution
#         self.vid.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
#         self.vid.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
#
#         self.current_frame = None
#         self.captured_image = None
#
#         # Create UI elements
#         self.create_ui()
#
#         # Start video update
#         self.update_frame()
#
#     def create_ui(self):
#         # Main frame to organize layout
#         main_frame = Frame(self.root)
#         main_frame.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)
#
#         # Video feed section
#         video_frame = Frame(main_frame, borderwidth=2, relief=tk.RAISED)
#         video_frame.grid(row=0, column=0, padx=5, pady=5, sticky='nsew')
#
#         # Video feed label with fixed size
#         self.video_label = Label(video_frame, width=640, height=480)
#         self.video_label.pack(padx=10, pady=10)
#
#         # Button frame
#         button_frame = Frame(main_frame)
#         button_frame.grid(row=1, column=0, padx=5, pady=5, sticky='ew')
#
#         # Capture button
#         self.capture_button = Button(
#             button_frame,
#             text="Capture Image",
#             command=self.capture_frame,
#             font=("Arial", 14),
#             width=15
#         )
#         self.capture_button.pack(side=tk.LEFT, padx=10, pady=10)
#
#         # Predict button
#         self.predict_button = Button(
#             button_frame,
#             text="Predict",
#             command=self.predict_captured_image,
#             font=("Arial", 14),
#             width=15,
#             state=tk.DISABLED
#         )
#         self.predict_button.pack(side=tk.LEFT, padx=10, pady=10)
#
#         # Captured image and result section
#         result_frame = Frame(main_frame, borderwidth=2, relief=tk.RAISED)
#         result_frame.grid(row=2, column=0, padx=5, pady=5, sticky='nsew')
#
#         # Captured image label
#         self.captured_label = Label(
#             result_frame,
#             width=300,
#             height=300,
#             borderwidth=2,
#             relief="solid"
#         )
#         self.captured_label.pack(side=tk.LEFT, padx=10, pady=10)
#
#         # Detailed result frame
#         detailed_result_frame = Frame(result_frame)
#         detailed_result_frame.pack(side=tk.LEFT, padx=10, pady=10, expand=True, fill=tk.BOTH)
#
#         # Result labels with more detailed information
#         self.category_label = Label(
#             detailed_result_frame,
#             text="Category: ",
#             font=("Arial", 16),
#             anchor='w'
#         )
#         self.category_label.pack(fill=tk.X, pady=5)
#
#
#
#         # Configure grid weights
#         main_frame.grid_rowconfigure(0, weight=1)
#         main_frame.grid_rowconfigure(2, weight=1)
#         main_frame.grid_columnconfigure(0, weight=1)
#
#     def update_frame(self):
#         ret, frame = self.vid.read()
#         if ret:
#             self.current_frame = frame
#             # Convert frame for display
#             frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             # Resize frame to fit the label
#             frame_resized = cv2.resize(frame_rgb, (640, 480))
#             img_tk = ImageTk.PhotoImage(Image.fromarray(frame_resized))
#             self.video_label.img_tk = img_tk
#             self.video_label.config(image=img_tk)
#         self.video_label.after(10, self.update_frame)
#
#     def capture_frame(self):
#         if self.current_frame is not None:
#             # Resize to a 1:1 ratio
#             height, width, _ = self.current_frame.shape
#             size = min(height, width)
#             center_y, center_x = height // 2, width // 2
#             self.captured_image = self.current_frame[
#                                   center_y - size // 2:center_y + size // 2,
#                                   center_x - size // 2:center_x + size // 2
#                                   ]
#
#             # Display the captured image in the UI
#             img_resized = cv2.resize(self.captured_image, (300, 300))
#             img_tk = ImageTk.PhotoImage(Image.fromarray(cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)))
#             self.captured_label.img_tk = img_tk
#             self.captured_label.config(image=img_tk)
#
#             # Enable predict button
#             self.predict_button.config(state=tk.NORMAL)
#
#             # Reset result labels
#             self.category_label.config(text="Category: ")
#
#     def predict_captured_image(self):
#         if self.captured_image is None:
#             messagebox.showwarning("Prediction", "Please capture an image first")
#             return
#
#         if self.model is None:
#             messagebox.showerror("Model Error", "Model not loaded")
#             return
#
#         # Convert image to PIL format
#         img_pil = Image.fromarray(self.captured_image)
#         img_tensor = self.tfm(img_pil)
#         img_tensor = img_tensor[np.newaxis, :]  # Add batch dimension
#         img_tensor = img_tensor.to(self.device)
#
#         try:
#             # Predict
#             with torch.no_grad():
#                 pred_prob = self.model(img_tensor)
#             pred = torch.max(pred_prob, 1).indices.item()
#             category = self.categories[pred]
#             confidence = torch.max(pred_prob, 1).values.item() * 100
#
#             # Send prediction to microcontroller if serial is connected
#             if self.ser:
#                 self.ser.write(str.encode(str(pred)))
#
#             # Display result in UI
#             self.category_label.config(text=f"Category: {category}")
#
#             print(f"Model Prediction: {pred}, --{category}, Confidence: {confidence:.2f}%")
#
#         except Exception as e:
#             messagebox.showerror("Prediction Error", f"Could not run prediction: {e}")
#
#     def __del__(self):
#         # Release resources
#         if self.vid.isOpened():
#             self.vid.release()
#         if self.ser:
#             self.ser.close()
#
#
# # Main application setup
# def main():
#     root = tk.Tk()
#     # Replace with your video source (IP webcam, local camera, etc.)
#     video_source = "http://192.168.1.121:8080/video"
#     app = WasteClassificationApp(root, video_source)
#     root.mainloop()
#
#
# if __name__ == "__main__":
#     main()
import tkinter as tk
from tkinter import Label, Button, messagebox, Frame
import cv2
from PIL import Image, ImageTk
import numpy as np
import torch
from torchvision.transforms import transforms
import torchvision.models as models
from torch.nn import Linear
# import serial  # Commented out IoT communication


class WasteClassificationApp:
    def __init__(self, root, video_source):
        self.root = root
        self.root.title("Waste Classification from Live Feed")
        self.root.geometry("900x800")  # Increased window size

        # Commented out serial communication
        # try:
        #     self.ser = serial.Serial()
        #     self.ser.port = 'COM4'
        #     self.ser.baudrate = 9600
        #     self.ser.close()
        #     self.ser.open()
        # except Exception as e:
        #     messagebox.showwarning("Serial Connection", f"Could not open serial port: {e}")
        #     self.ser = None

        # Define device
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Define transformations for input images
        self.tfm = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

        # Load the trained model
        try:
            self.model = models.resnet34(pretrained=True)
            # from torchvision.models import ResNet34_Weights
            #
            # self.model = models.resnet34(weights=ResNet34_Weights.IMAGENET1K_V1)  # or use ResNet34_Weights.DEFAULT

            self.model.fc = Linear(in_features=512, out_features=6)
            # self.model.load_state_dict(torch.load(r'C:\Users\krishna sai reddy\Downloads\bestmodel.pth'))
            self.model.load_state_dict(

                torch.load(r'C:\Users\krishna sai reddy\Downloads\bestmodel.pth', map_location=torch.device('cpu')))

            # self.model.load_state_dict(
            #     torch.load(r'C:\Users\krishna sai reddy\Downloads\bestmodel.pth', weights_only=True))

            self.model.eval()
            self.model.to(self.device)
        except Exception as e:
            messagebox.showerror("Model Loading", f"Could not load model: {e}")
            self.model = None

        # Mapping predictions to categories
        self.categories = [
            "E-Waste",
            "Food Waste",
            "Leaf Waste",
            "Medical Waste",
            "Metal",
            "Plastic"
        ]

        # Video capture
        self.vid = cv2.VideoCapture(video_source)
        self.vid.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.vid.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        self.current_frame = None
        self.captured_image = None

        # Create UI elements
        self.create_ui()
        self.update_frame()

    def create_ui(self):
        main_frame = Frame(self.root)
        main_frame.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

        video_frame = Frame(main_frame, borderwidth=2, relief=tk.RAISED)
        video_frame.grid(row=0, column=0, padx=5, pady=5, sticky='nsew')

        self.video_label = Label(video_frame, width=640, height=480)
        self.video_label.pack(padx=10, pady=10)

        button_frame = Frame(main_frame)
        button_frame.grid(row=1, column=0, padx=5, pady=5, sticky='ew')

        self.capture_button = Button(
            button_frame,
            text="Capture Image",
            command=self.capture_frame,
            font=("Arial", 14),
            width=15
        )
        self.capture_button.pack(side=tk.LEFT, padx=10, pady=10)

        self.predict_button = Button(
            button_frame,
            text="Predict",
            command=self.predict_captured_image,
            font=("Arial", 14),
            width=15,
            state=tk.DISABLED
        )
        self.predict_button.pack(side=tk.LEFT, padx=10, pady=10)

        result_frame = Frame(main_frame, borderwidth=2, relief=tk.RAISED)
        result_frame.grid(row=2, column=0, padx=5, pady=5, sticky='nsew')

        self.captured_label = Label(result_frame, width=300, height=300, borderwidth=2, relief="solid")
        self.captured_label.pack(side=tk.LEFT, padx=10, pady=10)

        detailed_result_frame = Frame(result_frame)
        detailed_result_frame.pack(side=tk.LEFT, padx=10, pady=10, expand=True, fill=tk.BOTH)

        self.category_label = Label(detailed_result_frame, text="Category: ", font=("Arial", 16), anchor='w')
        self.category_label.pack(fill=tk.X, pady=5)

        main_frame.grid_rowconfigure(0, weight=1)
        main_frame.grid_rowconfigure(2, weight=1)
        main_frame.grid_columnconfigure(0, weight=1)

    def update_frame(self):
        ret, frame = self.vid.read()
        if ret:
            self.current_frame = frame
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame_resized = cv2.resize(frame_rgb, (640, 480))
            img_tk = ImageTk.PhotoImage(Image.fromarray(frame_resized))
            self.video_label.img_tk = img_tk
            self.video_label.config(image=img_tk)
        self.video_label.after(10, self.update_frame)

    def capture_frame(self):
        if self.current_frame is not None:
            height, width, _ = self.current_frame.shape
            size = min(height, width)
            center_y, center_x = height // 2, width // 2
            self.captured_image = self.current_frame[center_y - size // 2:center_y + size // 2, center_x - size // 2:center_x + size // 2]

            img_resized = cv2.resize(self.captured_image, (300, 300))
            img_tk = ImageTk.PhotoImage(Image.fromarray(cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)))
            self.captured_label.img_tk = img_tk
            self.captured_label.config(image=img_tk)

            self.predict_button.config(state=tk.NORMAL)
            self.category_label.config(text="Category: ")

    def predict_captured_image(self):
        if self.captured_image is None:
            messagebox.showwarning("Prediction", "Please capture an image first")
            return

        if self.model is None:
            messagebox.showerror("Model Error", "Model not loaded")
            return

        img_pil = Image.fromarray(self.captured_image)
        img_tensor = self.tfm(img_pil)
        img_tensor = img_tensor[np.newaxis, :]
        img_tensor = img_tensor.to(self.device)

        try:
            with torch.no_grad():
                pred_prob = self.model(img_tensor)
            pred = torch.max(pred_prob, 1).indices.item()
            category = self.categories[pred]
            confidence = torch.max(pred_prob, 1).values.item() * 100

            # Commented out serial communication
            # if self.ser:
            #     self.ser.write(str.encode(str(pred)))

            self.category_label.config(text=f"Category: {category}")

            print(f"Model Prediction: {pred}, --{category}, Confidence: {confidence:.2f}%")

        except Exception as e:
            messagebox.showerror("Prediction Error", f"Could not run prediction: {e}")

    def __del__(self):
        if self.vid.isOpened():
            self.vid.release()
        # if self.ser:
        #     self.ser.close()


# Main application setup
if __name__ == "__main__":
    root = tk.Tk()
    video_source = "http://192.168.10.59:8080/video"
    app = WasteClassificationApp(root, video_source)
    root.mainloop()
