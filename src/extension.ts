
import * as vscode from 'vscode';

let drStatusBarItem: vscode.StatusBarItem;
let itemSettings  = vscode.workspace.getConfiguration('statusBarCustomItem');
let colorSettings = vscode.workspace.getConfiguration('statusBarCustomColor');

function updateStatusBar(context: vscode.ExtensionContext): void {
    let name    = itemSettings.get("text") as string;
	let icon    = itemSettings.get("icon") as string;
	let tooltip = itemSettings.get("tooltip") as string;

	let primaryBk   = colorSettings.get("primaryBkColor") as string;
	let secondaryBk = colorSettings.get("secondaryBkColor") as string;
	let foreground  = colorSettings.get("foregroundColor") as string;

	drStatusBarItem.text = `${icon} ${name}`;
	drStatusBarItem.tooltip = tooltip;
	drStatusBarItem.show();

	const workbenchConfiguration = vscode.workspace.getConfiguration('workbench');
	const currentColorCustomizations: {
		[index:string]: string;		
	} = workbenchConfiguration.get('colorCustomizations') ?? {};

	const colorCustomizations = { ...currentColorCustomizations};
	if (primaryBk !== undefined) {
		colorCustomizations['statusBar.background'] = primaryBk;
	}
	if (secondaryBk !== undefined) {
		colorCustomizations['statusBar.noFolderBackground']  = secondaryBk;
		colorCustomizations['statusBar.debuggingBackground'] = secondaryBk;
	}
	if (foreground !== undefined) {
		colorCustomizations['statusBar.foreground'] = foreground;
		colorCustomizations['statusBar.debuggingForeground'] = foreground;
	}
	if (currentColorCustomizations !== colorCustomizations) {
		workbenchConfiguration.update('colorCustomizations',colorCustomizations, true);
	}


}

export function activate(context: vscode.ExtensionContext) {
	drStatusBarItem = vscode.window.createStatusBarItem(
	vscode.StatusBarAlignment.Left,
	10000
  );

  context.subscriptions.push(drStatusBarItem);

  updateStatusBar(context);
}
