import * as vscode from 'vscode';
import * as iconv from 'iconv-lite'
import * as tool from 'encode/encoding'
import * as buffer from 'common/buffer'
import * as fs from 'fs'

export function activate(context: vscode.ExtensionContext) {

	
	let file = vscode.Uri.file("E:/workspace/batch encode/asset/gb2312.txt");
	const source = buffer.streamToBufferReadableStream(fs.createReadStream(file.fsPath));
	let out =  tool.toDecodeStream(source,{ acceptTextOnly: true, minBytesRequiredForDetection: 4,guessEncoding: true, overwriteEncoding: async (encoding) => encoding })
	out.then((val) =>{
		console.log(val.detected);
	})
	
	// vscode.workspace.fs.readFile(file).then((data) => {

	// 	let target = iconv.decode(Buffer.from(data), 'utf8');
	// 	console.log(target);
	//  });
	

	let disposable = vscode.commands.registerCommand('triangle.helloWorld', () => {
		console.log("test");
		vscode.window.showInformationMessage('Hello World from Batch Encode!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
