from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QLineEdit, QPushButton
import sys  # 確保有導入 sys
import webbrowser

class SearchApp(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("Google 搜尋")
        self.setGeometry(100, 100, 300, 100)
        
        self.layout = QVBoxLayout()
        
        self.input_box = QLineEdit(self)
        self.input_box.setPlaceholderText("輸入搜尋內容...")
        self.layout.addWidget(self.input_box)
        
        self.search_button = QPushButton("搜尋", self)
        self.search_button.clicked.connect(self.search)
        self.layout.addWidget(self.search_button)
        
        self.setLayout(self.layout)

    def search(self):
        query = self.input_box.text()
        if query:
            url = f"https://www.google.com/search?q={query}"
            webbrowser.open(url)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = SearchApp()
    window.show()
    sys.exit(app.exec())
