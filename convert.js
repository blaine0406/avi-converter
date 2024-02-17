const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

function convertAviToMp4(inputFolder, outputFolder) {
    fs.readdir(inputFolder, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            if (path.extname(file) === '.avi') {
                const inputPath = path.join(inputFolder, file);
                const outputPath = path.join(outputFolder, path.parse(file).name + '.mp4');
                
                ffmpeg(inputPath)
                    .output(outputPath)
                    .on('end', () => {
                        console.log(`File ${file} converted successfully.`);
                    })
                    .on('error', (err) => {
                        console.error(`Error converting file ${file}: ${err.message}`);
                    })
                    .run();
            }
        });
    });
}

// Example usage:
const inputFolder = './input';
const outputFolder = './output';
convertAviToMp4(inputFolder, outputFolder);