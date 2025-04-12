#include <iostream>
#include <cstdlib>
#include <string>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <output_file_path>\n";
        return 1;
    }

    std::string outputPath = argv[1];

    // Wrap path in double quotes to avoid space issues
    std::string command =
        "powershell -Command \""
        "Add-Type -AssemblyName System.Windows.Forms; "
        "Add-Type -AssemblyName System.Drawing; "
        "$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; "
        "$bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height; "
        "$graphics = [System.Drawing.Graphics]::FromImage($bitmap); "
        "$graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size); "
        "$bitmap.Save('" + outputPath + "', [System.Drawing.Imaging.ImageFormat]::Png); "
        "\"";

    int result = std::system(command.c_str());

    if (result == 0) {
        std::cout << "Screenshot saved to: " << outputPath << "\n";
        return 0;
    } else {
        std::cerr << "Screenshot failed. Is PowerShell enabled?\n";
        return 1;
    }
}

