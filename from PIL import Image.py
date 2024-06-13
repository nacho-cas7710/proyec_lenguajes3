import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

class MenuApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Menú de Restaurante")
        
        self.frame = tk.Frame(root)
        self.frame.pack()

        self.load_button = tk.Button(root, text="Cargar Imágenes", command=self.load_images)
        self.load_button.pack()

        self.images = []

    def load_images(self):
        file_paths = filedialog.askopenfilenames(filetypes=[("Image files", "*.jpg *.jpeg *.png")])
        if file_paths:
            self.images = [Image.open(file_path) for file_path in file_paths]
            self.display_images()

    def display_images(self):
        for widget in self.frame.winfo_children():
            widget.destroy()

        cols = 3  # Número de columnas en la cuadrícula
        for i, image in enumerate(self.images):
            row, col = divmod(i, cols)
            tk_image = ImageTk.PhotoImage(image.resize((200, 200)))  # Redimensionar imágenes
            label = tk.Label(self.frame, image=tk_image)
            label.image = tk_image  # Mantener una referencia para evitar que se elimine la imagen
            label.grid(row=row, column=col, padx=5, pady=5)

if __name__ == "__main__":
    root = tk.Tk()
    app = MenuApp(root)
    root.mainloop()
