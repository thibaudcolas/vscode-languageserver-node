/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { RequestType } from 'vscode-jsonrpc';
import { TextDocumentRegistrationOptions, StaticRegistrationOptions } from './protocol';
import { TextDocumentIdentifier, Range, Color, ColorInformation, ColorPresentation } from 'vscode-languageserver-types';

//---- Server capability ----

export interface ColorClientCapabilities {
	/**
	 * The text document client capabilities
	 */
	textDocument?: {
		/**
		 * Capabilities specific to the colorProvider
		 */
		colorProvider?: {
			/**
			 * Whether implementation supports dynamic registration. If this is set to `true`
			 * the client supports the new `(ColorProviderOptions & TextDocumentRegistrationOptions & StaticRegistrationOptions)`
			 * return value for the corresponding server capability as well.
			 */
			dynamicRegistration?: boolean;
		};
	}
}

export interface ColorProviderOptions {
}

export interface ColorServerCapabilities {
	/**
	 * The server provides color provider support.
	 */
	colorProvider?: boolean | ColorProviderOptions | (ColorProviderOptions & TextDocumentRegistrationOptions & StaticRegistrationOptions);
}

//---- Color Symbol Provider ---------------------------

/**
 * Parameters for a [DocumentColorRequest](#DocumentColorRequest).
 */
export interface DocumentColorParams {
	/**
	 * The text document.
	 */
	textDocument: TextDocumentIdentifier;
}

/**
 * A request to list all color symbols found in a given text document. The request's
 * parameter is of type [DocumentColorParams](#DocumentColorParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
export namespace DocumentColorRequest {
	export const type = new RequestType<DocumentColorParams, ColorInformation[], void, TextDocumentRegistrationOptions>('textDocument/documentColor');
}

/**
 * Parameters for a [ColorPresentationRequest](#ColorPresentationRequest).
 */
export interface ColorPresentationParams {
	/**
	 * The text document.
	 */
	textDocument: TextDocumentIdentifier;

	/**
	 * The color to request presentations for.
	 */
	color: Color

	/**
	 * The range where the color would be inserted. Serves as a context.
	 */
	range: Range;
}

/**
 * A request to list all presentation for a color. The request's
 * parameter is of type [ColorPresentationParams](#ColorPresentationParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
export namespace ColorPresentationRequest {
	export const type = new RequestType<ColorPresentationParams, ColorPresentation[], void, TextDocumentRegistrationOptions>('textDocument/colorPresentation');
}
