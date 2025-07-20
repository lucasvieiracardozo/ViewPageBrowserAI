/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@google/generative-ai/dist/index.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@google/generative-ai/dist/index.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockReason: () => (/* binding */ BlockReason),
/* harmony export */   ChatSession: () => (/* binding */ ChatSession),
/* harmony export */   DynamicRetrievalMode: () => (/* binding */ DynamicRetrievalMode),
/* harmony export */   ExecutableCodeLanguage: () => (/* binding */ ExecutableCodeLanguage),
/* harmony export */   FinishReason: () => (/* binding */ FinishReason),
/* harmony export */   FunctionCallingMode: () => (/* binding */ FunctionCallingMode),
/* harmony export */   GenerativeModel: () => (/* binding */ GenerativeModel),
/* harmony export */   GoogleGenerativeAI: () => (/* binding */ GoogleGenerativeAI),
/* harmony export */   GoogleGenerativeAIAbortError: () => (/* binding */ GoogleGenerativeAIAbortError),
/* harmony export */   GoogleGenerativeAIError: () => (/* binding */ GoogleGenerativeAIError),
/* harmony export */   GoogleGenerativeAIFetchError: () => (/* binding */ GoogleGenerativeAIFetchError),
/* harmony export */   GoogleGenerativeAIRequestInputError: () => (/* binding */ GoogleGenerativeAIRequestInputError),
/* harmony export */   GoogleGenerativeAIResponseError: () => (/* binding */ GoogleGenerativeAIResponseError),
/* harmony export */   HarmBlockThreshold: () => (/* binding */ HarmBlockThreshold),
/* harmony export */   HarmCategory: () => (/* binding */ HarmCategory),
/* harmony export */   HarmProbability: () => (/* binding */ HarmProbability),
/* harmony export */   Outcome: () => (/* binding */ Outcome),
/* harmony export */   POSSIBLE_ROLES: () => (/* binding */ POSSIBLE_ROLES),
/* harmony export */   SchemaType: () => (/* binding */ SchemaType),
/* harmony export */   TaskType: () => (/* binding */ TaskType)
/* harmony export */ });
/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 * @public
 */
var SchemaType;
(function (SchemaType) {
    /** String type. */
    SchemaType["STRING"] = "string";
    /** Number type. */
    SchemaType["NUMBER"] = "number";
    /** Integer type. */
    SchemaType["INTEGER"] = "integer";
    /** Boolean type. */
    SchemaType["BOOLEAN"] = "boolean";
    /** Array type. */
    SchemaType["ARRAY"] = "array";
    /** Object type. */
    SchemaType["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @public
 */
var ExecutableCodeLanguage;
(function (ExecutableCodeLanguage) {
    ExecutableCodeLanguage["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
    ExecutableCodeLanguage["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
/**
 * Possible outcomes of code execution.
 * @public
 */
var Outcome;
(function (Outcome) {
    /**
     * Unspecified status. This value should not be used.
     */
    Outcome["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
    /**
     * Code execution completed successfully.
     */
    Outcome["OUTCOME_OK"] = "outcome_ok";
    /**
     * Code execution finished but with a failure. `stderr` should contain the
     * reason.
     */
    Outcome["OUTCOME_FAILED"] = "outcome_failed";
    /**
     * Code execution ran for too long, and was cancelled. There may or may not
     * be a partial output present.
     */
    Outcome["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Possible roles.
 * @public
 */
const POSSIBLE_ROLES = ["user", "model", "function", "system"];
/**
 * Harm categories that would cause prompts or candidates to be blocked.
 * @public
 */
var HarmCategory;
(function (HarmCategory) {
    HarmCategory["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
    HarmCategory["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    HarmCategory["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    HarmCategory["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    HarmCategory["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
    HarmCategory["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
/**
 * Threshold above which a prompt or candidate will be blocked.
 * @public
 */
var HarmBlockThreshold;
(function (HarmBlockThreshold) {
    /** Threshold is unspecified. */
    HarmBlockThreshold["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
    /** Content with NEGLIGIBLE will be allowed. */
    HarmBlockThreshold["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    /** Content with NEGLIGIBLE and LOW will be allowed. */
    HarmBlockThreshold["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    /** Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed. */
    HarmBlockThreshold["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    /** All content will be allowed. */
    HarmBlockThreshold["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
/**
 * Probability that a prompt or candidate matches a harm category.
 * @public
 */
var HarmProbability;
(function (HarmProbability) {
    /** Probability is unspecified. */
    HarmProbability["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
    /** Content has a negligible chance of being unsafe. */
    HarmProbability["NEGLIGIBLE"] = "NEGLIGIBLE";
    /** Content has a low chance of being unsafe. */
    HarmProbability["LOW"] = "LOW";
    /** Content has a medium chance of being unsafe. */
    HarmProbability["MEDIUM"] = "MEDIUM";
    /** Content has a high chance of being unsafe. */
    HarmProbability["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
/**
 * Reason that a prompt was blocked.
 * @public
 */
var BlockReason;
(function (BlockReason) {
    // A blocked reason was not specified.
    BlockReason["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
    // Content was blocked by safety settings.
    BlockReason["SAFETY"] = "SAFETY";
    // Content was blocked, but the reason is uncategorized.
    BlockReason["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
/**
 * Reason that a candidate finished.
 * @public
 */
var FinishReason;
(function (FinishReason) {
    // Default value. This value is unused.
    FinishReason["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
    // Natural stop point of the model or provided stop sequence.
    FinishReason["STOP"] = "STOP";
    // The maximum number of tokens as specified in the request was reached.
    FinishReason["MAX_TOKENS"] = "MAX_TOKENS";
    // The candidate content was flagged for safety reasons.
    FinishReason["SAFETY"] = "SAFETY";
    // The candidate content was flagged for recitation reasons.
    FinishReason["RECITATION"] = "RECITATION";
    // The candidate content was flagged for using an unsupported language.
    FinishReason["LANGUAGE"] = "LANGUAGE";
    // Token generation stopped because the content contains forbidden terms.
    FinishReason["BLOCKLIST"] = "BLOCKLIST";
    // Token generation stopped for potentially containing prohibited content.
    FinishReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    // Token generation stopped because the content potentially contains Sensitive Personally Identifiable Information (SPII).
    FinishReason["SPII"] = "SPII";
    // The function call generated by the model is invalid.
    FinishReason["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
    // Unknown reason.
    FinishReason["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
/**
 * Task type for embedding content.
 * @public
 */
var TaskType;
(function (TaskType) {
    TaskType["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
    TaskType["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
    TaskType["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
    TaskType["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
    TaskType["CLASSIFICATION"] = "CLASSIFICATION";
    TaskType["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
/**
 * @public
 */
var FunctionCallingMode;
(function (FunctionCallingMode) {
    // Unspecified function calling mode. This value should not be used.
    FunctionCallingMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Default model behavior, model decides to predict either a function call
    // or a natural language repspose.
    FunctionCallingMode["AUTO"] = "AUTO";
    // Model is constrained to always predicting a function call only.
    // If "allowed_function_names" are set, the predicted function call will be
    // limited to any one of "allowed_function_names", else the predicted
    // function call will be any one of the provided "function_declarations".
    FunctionCallingMode["ANY"] = "ANY";
    // Model will not predict any function call. Model behavior is same as when
    // not passing any function declarations.
    FunctionCallingMode["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
/**
 * The mode of the predictor to be used in dynamic retrieval.
 * @public
 */
var DynamicRetrievalMode;
(function (DynamicRetrievalMode) {
    // Unspecified function calling mode. This value should not be used.
    DynamicRetrievalMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Run retrieval only when system decides it is necessary.
    DynamicRetrievalMode["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Basic error type for this SDK.
 * @public
 */
class GoogleGenerativeAIError extends Error {
    constructor(message) {
        super(`[GoogleGenerativeAI Error]: ${message}`);
    }
}
/**
 * Errors in the contents of a response from the model. This includes parsing
 * errors, or responses including a safety block reason.
 * @public
 */
class GoogleGenerativeAIResponseError extends GoogleGenerativeAIError {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}
/**
 * Error class covering HTTP errors when calling the server. Includes HTTP
 * status, statusText, and optional details, if provided in the server response.
 * @public
 */
class GoogleGenerativeAIFetchError extends GoogleGenerativeAIError {
    constructor(message, status, statusText, errorDetails) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.errorDetails = errorDetails;
    }
}
/**
 * Errors in the contents of a request originating from user input.
 * @public
 */
class GoogleGenerativeAIRequestInputError extends GoogleGenerativeAIError {
}
/**
 * Error thrown when a request is aborted, either due to a timeout or
 * intentional cancellation by the user.
 * @public
 */
class GoogleGenerativeAIAbortError extends GoogleGenerativeAIError {
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
const DEFAULT_API_VERSION = "v1beta";
/**
 * We can't `require` package.json if this runs on web. We will use rollup to
 * swap in the version number here at build time.
 */
const PACKAGE_VERSION = "0.24.1";
const PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function (Task) {
    Task["GENERATE_CONTENT"] = "generateContent";
    Task["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
    Task["COUNT_TOKENS"] = "countTokens";
    Task["EMBED_CONTENT"] = "embedContent";
    Task["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
class RequestUrl {
    constructor(model, task, apiKey, stream, requestOptions) {
        this.model = model;
        this.task = task;
        this.apiKey = apiKey;
        this.stream = stream;
        this.requestOptions = requestOptions;
    }
    toString() {
        var _a, _b;
        const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
        const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
        let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
        if (this.stream) {
            url += "?alt=sse";
        }
        return url;
    }
}
/**
 * Simple, but may become more complex if we add more versions to log.
 */
function getClientHeaders(requestOptions) {
    const clientHeaders = [];
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
        clientHeaders.push(requestOptions.apiClient);
    }
    clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
    return clientHeaders.join(" ");
}
async function getHeaders(url) {
    var _a;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
    headers.append("x-goog-api-key", url.apiKey);
    let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
    if (customHeaders) {
        if (!(customHeaders instanceof Headers)) {
            try {
                customHeaders = new Headers(customHeaders);
            }
            catch (e) {
                throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
            }
        }
        for (const [headerName, headerValue] of customHeaders.entries()) {
            if (headerName === "x-goog-api-key") {
                throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
            }
            else if (headerName === "x-goog-api-client") {
                throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
            }
            headers.append(headerName, headerValue);
        }
    }
    return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
    const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
    return {
        url: url.toString(),
        fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body }),
    };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, 
// Allows this to be stubbed for tests
fetchFn = fetch) {
    const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
    return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
    let response;
    try {
        response = await fetchFn(url, fetchOptions);
    }
    catch (e) {
        handleResponseError(e, url);
    }
    if (!response.ok) {
        await handleResponseNotOk(response, url);
    }
    return response;
}
function handleResponseError(e, url) {
    let err = e;
    if (err.name === "AbortError") {
        err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    else if (!(e instanceof GoogleGenerativeAIFetchError ||
        e instanceof GoogleGenerativeAIRequestInputError)) {
        err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    throw err;
}
async function handleResponseNotOk(response, url) {
    let message = "";
    let errorDetails;
    try {
        const json = await response.json();
        message = json.error.message;
        if (json.error.details) {
            message += ` ${JSON.stringify(json.error.details)}`;
            errorDetails = json.error.details;
        }
    }
    catch (e) {
        // ignored
    }
    throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
/**
 * Generates the request options to be passed to the fetch API.
 * @param requestOptions - The user-defined request options.
 * @returns The generated request options.
 */
function buildFetchOptions(requestOptions) {
    const fetchOptions = {};
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== undefined || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
        const controller = new AbortController();
        if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
            setTimeout(() => controller.abort(), requestOptions.timeout);
        }
        if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
            requestOptions.signal.addEventListener("abort", () => {
                controller.abort();
            });
        }
        fetchOptions.signal = controller.signal;
    }
    return fetchOptions;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Adds convenience helper methods to a response object, including stream
 * chunks (as long as each chunk is a complete GenerateContentResponse JSON).
 */
function addHelpers(response) {
    response.text = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning text from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getText(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return "";
    };
    /**
     * TODO: remove at next major version
     */
    response.functionCall = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            console.warn(`response.functionCall() is deprecated. ` +
                `Use response.functionCalls() instead.`);
            return getFunctionCalls(response)[0];
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    response.functionCalls = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getFunctionCalls(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    return response;
}
/**
 * Returns all text found in all parts of first candidate.
 */
function getText(response) {
    var _a, _b, _c, _d;
    const textStrings = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.text) {
                textStrings.push(part.text);
            }
            if (part.executableCode) {
                textStrings.push("\n```" +
                    part.executableCode.language +
                    "\n" +
                    part.executableCode.code +
                    "\n```\n");
            }
            if (part.codeExecutionResult) {
                textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
            }
        }
    }
    if (textStrings.length > 0) {
        return textStrings.join("");
    }
    else {
        return "";
    }
}
/**
 * Returns functionCall of first candidate.
 */
function getFunctionCalls(response) {
    var _a, _b, _c, _d;
    const functionCalls = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.functionCall) {
                functionCalls.push(part.functionCall);
            }
        }
    }
    if (functionCalls.length > 0) {
        return functionCalls;
    }
    else {
        return undefined;
    }
}
const badFinishReasons = [
    FinishReason.RECITATION,
    FinishReason.SAFETY,
    FinishReason.LANGUAGE,
];
function hadBadFinishReason(candidate) {
    return (!!candidate.finishReason &&
        badFinishReasons.includes(candidate.finishReason));
}
function formatBlockErrorMessage(response) {
    var _a, _b, _c;
    let message = "";
    if ((!response.candidates || response.candidates.length === 0) &&
        response.promptFeedback) {
        message += "Response was blocked";
        if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
            message += ` due to ${response.promptFeedback.blockReason}`;
        }
        if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
            message += `: ${response.promptFeedback.blockReasonMessage}`;
        }
    }
    else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
        const firstCandidate = response.candidates[0];
        if (hadBadFinishReason(firstCandidate)) {
            message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
            if (firstCandidate.finishMessage) {
                message += `: ${firstCandidate.finishMessage}`;
            }
        }
    }
    return message;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 */
function processStream(response) {
    const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
    const responseStream = getResponseStream(inputStream);
    const [stream1, stream2] = responseStream.tee();
    return {
        stream: generateResponseSequence(stream1),
        response: getResponsePromise(stream2),
    };
}
async function getResponsePromise(stream) {
    const allResponses = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            return addHelpers(aggregateResponses(allResponses));
        }
        allResponses.push(value);
    }
}
function generateResponseSequence(stream) {
    return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
        const reader = stream.getReader();
        while (true) {
            const { value, done } = yield __await(reader.read());
            if (done) {
                break;
            }
            yield yield __await(addHelpers(value));
        }
    });
}
/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 */
function getResponseStream(inputStream) {
    const reader = inputStream.getReader();
    const stream = new ReadableStream({
        start(controller) {
            let currentText = "";
            return pump();
            function pump() {
                return reader
                    .read()
                    .then(({ value, done }) => {
                    if (done) {
                        if (currentText.trim()) {
                            controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
                            return;
                        }
                        controller.close();
                        return;
                    }
                    currentText += value;
                    let match = currentText.match(responseLineRE);
                    let parsedResponse;
                    while (match) {
                        try {
                            parsedResponse = JSON.parse(match[1]);
                        }
                        catch (e) {
                            controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
                            return;
                        }
                        controller.enqueue(parsedResponse);
                        currentText = currentText.substring(match[0].length);
                        match = currentText.match(responseLineRE);
                    }
                    return pump();
                })
                    .catch((e) => {
                    let err = e;
                    err.stack = e.stack;
                    if (err.name === "AbortError") {
                        err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
                    }
                    else {
                        err = new GoogleGenerativeAIError("Error reading from the stream");
                    }
                    throw err;
                });
            }
        },
    });
    return stream;
}
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 */
function aggregateResponses(responses) {
    const lastResponse = responses[responses.length - 1];
    const aggregatedResponse = {
        promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback,
    };
    for (const response of responses) {
        if (response.candidates) {
            let candidateIndex = 0;
            for (const candidate of response.candidates) {
                if (!aggregatedResponse.candidates) {
                    aggregatedResponse.candidates = [];
                }
                if (!aggregatedResponse.candidates[candidateIndex]) {
                    aggregatedResponse.candidates[candidateIndex] = {
                        index: candidateIndex,
                    };
                }
                // Keep overwriting, the last one will be final
                aggregatedResponse.candidates[candidateIndex].citationMetadata =
                    candidate.citationMetadata;
                aggregatedResponse.candidates[candidateIndex].groundingMetadata =
                    candidate.groundingMetadata;
                aggregatedResponse.candidates[candidateIndex].finishReason =
                    candidate.finishReason;
                aggregatedResponse.candidates[candidateIndex].finishMessage =
                    candidate.finishMessage;
                aggregatedResponse.candidates[candidateIndex].safetyRatings =
                    candidate.safetyRatings;
                /**
                 * Candidates should always have content and parts, but this handles
                 * possible malformed responses.
                 */
                if (candidate.content && candidate.content.parts) {
                    if (!aggregatedResponse.candidates[candidateIndex].content) {
                        aggregatedResponse.candidates[candidateIndex].content = {
                            role: candidate.content.role || "user",
                            parts: [],
                        };
                    }
                    const newPart = {};
                    for (const part of candidate.content.parts) {
                        if (part.text) {
                            newPart.text = part.text;
                        }
                        if (part.functionCall) {
                            newPart.functionCall = part.functionCall;
                        }
                        if (part.executableCode) {
                            newPart.executableCode = part.executableCode;
                        }
                        if (part.codeExecutionResult) {
                            newPart.codeExecutionResult = part.codeExecutionResult;
                        }
                        if (Object.keys(newPart).length === 0) {
                            newPart.text = "";
                        }
                        aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
                    }
                }
            }
            candidateIndex++;
        }
        if (response.usageMetadata) {
            aggregatedResponse.usageMetadata = response.usageMetadata;
        }
    }
    return aggregatedResponse;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateContentStream(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.STREAM_GENERATE_CONTENT, apiKey, 
    /* stream */ true, JSON.stringify(params), requestOptions);
    return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.GENERATE_CONTENT, apiKey, 
    /* stream */ false, JSON.stringify(params), requestOptions);
    const responseJson = await response.json();
    const enhancedResponse = addHelpers(responseJson);
    return {
        response: enhancedResponse,
    };
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function formatSystemInstruction(input) {
    // null or undefined
    if (input == null) {
        return undefined;
    }
    else if (typeof input === "string") {
        return { role: "system", parts: [{ text: input }] };
    }
    else if (input.text) {
        return { role: "system", parts: [input] };
    }
    else if (input.parts) {
        if (!input.role) {
            return { role: "system", parts: input.parts };
        }
        else {
            return input;
        }
    }
}
function formatNewContent(request) {
    let newParts = [];
    if (typeof request === "string") {
        newParts = [{ text: request }];
    }
    else {
        for (const partOrString of request) {
            if (typeof partOrString === "string") {
                newParts.push({ text: partOrString });
            }
            else {
                newParts.push(partOrString);
            }
        }
    }
    return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
/**
 * When multiple Part types (i.e. FunctionResponsePart and TextPart) are
 * passed in a single Part array, we may need to assign different roles to each
 * part. Currently only FunctionResponsePart requires a role other than 'user'.
 * @private
 * @param parts Array of parts to pass to the model
 * @returns Array of content items
 */
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
    const userContent = { role: "user", parts: [] };
    const functionContent = { role: "function", parts: [] };
    let hasUserContent = false;
    let hasFunctionContent = false;
    for (const part of parts) {
        if ("functionResponse" in part) {
            functionContent.parts.push(part);
            hasFunctionContent = true;
        }
        else {
            userContent.parts.push(part);
            hasUserContent = true;
        }
    }
    if (hasUserContent && hasFunctionContent) {
        throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
    }
    if (!hasUserContent && !hasFunctionContent) {
        throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
    }
    if (hasUserContent) {
        return userContent;
    }
    return functionContent;
}
function formatCountTokensInput(params, modelParams) {
    var _a;
    let formattedGenerateContentRequest = {
        model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
        generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
        safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
        tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
        toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
        systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
        cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        contents: [],
    };
    const containsGenerateContentRequest = params.generateContentRequest != null;
    if (params.contents) {
        if (containsGenerateContentRequest) {
            throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
        }
        formattedGenerateContentRequest.contents = params.contents;
    }
    else if (containsGenerateContentRequest) {
        formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedGenerateContentRequest.contents = [content];
    }
    return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
    let formattedRequest;
    if (params.contents) {
        formattedRequest = params;
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedRequest = { contents: [content] };
    }
    if (params.systemInstruction) {
        formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
    }
    return formattedRequest;
}
function formatEmbedContentInput(params) {
    if (typeof params === "string" || Array.isArray(params)) {
        const content = formatNewContent(params);
        return { content };
    }
    return params;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://ai.google.dev/api/rest/v1beta/Content#part
const VALID_PART_FIELDS = [
    "text",
    "inlineData",
    "functionCall",
    "functionResponse",
    "executableCode",
    "codeExecutionResult",
];
const VALID_PARTS_PER_ROLE = {
    user: ["text", "inlineData"],
    function: ["functionResponse"],
    model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
    // System instructions shouldn't be in history anyway.
    system: ["text"],
};
function validateChatHistory(history) {
    let prevContent = false;
    for (const currContent of history) {
        const { role, parts } = currContent;
        if (!prevContent && role !== "user") {
            throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
        }
        if (!POSSIBLE_ROLES.includes(role)) {
            throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
        }
        if (!Array.isArray(parts)) {
            throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
        }
        if (parts.length === 0) {
            throw new GoogleGenerativeAIError("Each Content should have at least one part");
        }
        const countFields = {
            text: 0,
            inlineData: 0,
            functionCall: 0,
            functionResponse: 0,
            fileData: 0,
            executableCode: 0,
            codeExecutionResult: 0,
        };
        for (const part of parts) {
            for (const key of VALID_PART_FIELDS) {
                if (key in part) {
                    countFields[key] += 1;
                }
            }
        }
        const validParts = VALID_PARTS_PER_ROLE[role];
        for (const key of VALID_PART_FIELDS) {
            if (!validParts.includes(key) && countFields[key] > 0) {
                throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
            }
        }
        prevContent = true;
    }
}
/**
 * Returns true if the response is valid (could be appended to the history), flase otherwise.
 */
function isValidResponse(response) {
    var _a;
    if (response.candidates === undefined || response.candidates.length === 0) {
        return false;
    }
    const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
    if (content === undefined) {
        return false;
    }
    if (content.parts === undefined || content.parts.length === 0) {
        return false;
    }
    for (const part of content.parts) {
        if (part === undefined || Object.keys(part).length === 0) {
            return false;
        }
        if (part.text !== undefined && part.text === "") {
            return false;
        }
    }
    return true;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do not log a message for this error.
 */
const SILENT_ERROR = "SILENT_ERROR";
/**
 * ChatSession class that enables sending chat messages and stores
 * history of sent and received messages so far.
 *
 * @public
 */
class ChatSession {
    constructor(apiKey, model, params, _requestOptions = {}) {
        this.model = model;
        this.params = params;
        this._requestOptions = _requestOptions;
        this._history = [];
        this._sendPromise = Promise.resolve();
        this._apiKey = apiKey;
        if (params === null || params === void 0 ? void 0 : params.history) {
            validateChatHistory(params.history);
            this._history = params.history;
        }
    }
    /**
     * Gets the chat history so far. Blocked prompts are not added to history.
     * Blocked candidates are not added to history, nor are the prompts that
     * generated them.
     */
    async getHistory() {
        await this._sendPromise;
        return this._history;
    }
    /**
     * Sends a chat message and receives a non-streaming
     * {@link GenerateContentResult}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessage(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        let finalResult;
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions))
            .then((result) => {
            var _a;
            if (isValidResponse(result.response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({ parts: [], 
                    // Response seems to come back without a role set.
                    role: "model" }, (_a = result.response.candidates) === null || _a === void 0 ? void 0 : _a[0].content);
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(result.response);
                if (blockErrorMessage) {
                    console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
            finalResult = result;
        })
            .catch((e) => {
            // Resets _sendPromise to avoid subsequent calls failing and throw error.
            this._sendPromise = Promise.resolve();
            throw e;
        });
        await this._sendPromise;
        return finalResult;
    }
    /**
     * Sends a chat message and receives the response as a
     * {@link GenerateContentStreamResult} containing an iterable stream
     * and a response promise.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessageStream(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => streamPromise)
            // This must be handled to avoid unhandled rejection, but jump
            // to the final catch block with a label to not log this error.
            .catch((_ignored) => {
            throw new Error(SILENT_ERROR);
        })
            .then((streamResult) => streamResult.response)
            .then((response) => {
            if (isValidResponse(response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({}, response.candidates[0].content);
                // Response seems to come back without a role set.
                if (!responseContent.role) {
                    responseContent.role = "model";
                }
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(response);
                if (blockErrorMessage) {
                    console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
        })
            .catch((e) => {
            // Errors in streamPromise are already catchable by the user as
            // streamPromise is returned.
            // Avoid duplicating the error message in logs.
            if (e.message !== SILENT_ERROR) {
                // Users do not have access to _sendPromise to catch errors
                // downstream from streamPromise, so they should not throw.
                console.error(e);
            }
        });
        return streamPromise;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function countTokens(apiKey, model, params, singleRequestOptions) {
    const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function embedContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
    return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
    const requestsWithModel = params.requests.map((request) => {
        return Object.assign(Object.assign({}, request), { model });
    });
    const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for generative model APIs.
 * @public
 */
class GenerativeModel {
    constructor(apiKey, modelParams, _requestOptions = {}) {
        this.apiKey = apiKey;
        this._requestOptions = _requestOptions;
        if (modelParams.model.includes("/")) {
            // Models may be named "models/model-name" or "tunedModels/model-name"
            this.model = modelParams.model;
        }
        else {
            // If path is not included, assume it's a non-tuned model.
            this.model = `models/${modelParams.model}`;
        }
        this.generationConfig = modelParams.generationConfig || {};
        this.safetySettings = modelParams.safetySettings || [];
        this.tools = modelParams.tools;
        this.toolConfig = modelParams.toolConfig;
        this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
        this.cachedContent = modelParams.cachedContent;
    }
    /**
     * Makes a single non-streaming call to the model
     * and returns an object containing a single {@link GenerateContentResponse}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContent(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Makes a single streaming call to the model and returns an object
     * containing an iterable stream that iterates over all chunks in the
     * streaming response as well as a promise that returns the final
     * aggregated response.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContentStream(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Gets a new {@link ChatSession} instance which can be used for
     * multi-turn chats.
     */
    startChat(startChatParams) {
        var _a;
        return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
    }
    /**
     * Counts the tokens in the provided request.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async countTokens(request, requestOptions = {}) {
        const formattedParams = formatCountTokensInput(request, {
            model: this.model,
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: this.cachedContent,
        });
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds the provided content.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async embedContent(request, requestOptions = {}) {
        const formattedParams = formatEmbedContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds an array of {@link EmbedContentRequest}s.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Top-level class for this SDK
 * @public
 */
class GoogleGenerativeAI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    /**
     * Gets a {@link GenerativeModel} instance for the provided model name.
     */
    getGenerativeModel(modelParams, requestOptions) {
        if (!modelParams.model) {
            throw new GoogleGenerativeAIError(`Must provide a model name. ` +
                `Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
        }
        return new GenerativeModel(this.apiKey, modelParams, requestOptions);
    }
    /**
     * Creates a {@link GenerativeModel} instance from provided content cache.
     */
    getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
        if (!cachedContent.name) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
        }
        if (!cachedContent.model) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
        }
        /**
         * Not checking tools and toolConfig for now as it would require a deep
         * equality comparison and isn't likely to be a common case.
         */
        const disallowedDuplicates = ["model", "systemInstruction"];
        for (const key of disallowedDuplicates) {
            if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) &&
                cachedContent[key] &&
                (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
                if (key === "model") {
                    const modelParamsComp = modelParams.model.startsWith("models/")
                        ? modelParams.model.replace("models/", "")
                        : modelParams.model;
                    const cachedContentComp = cachedContent.model.startsWith("models/")
                        ? cachedContent.model.replace("models/", "")
                        : cachedContent.model;
                    if (modelParamsComp === cachedContentComp) {
                        continue;
                    }
                }
                throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams` +
                    ` (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
            }
        }
        const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
        return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./src/background/config.ts":
/*!**********************************!*\
  !*** ./src/background/config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearGeminiApiKey: () => (/* binding */ clearGeminiApiKey),
/* harmony export */   getExtensionConfig: () => (/* binding */ getExtensionConfig),
/* harmony export */   getGeminiApiKey: () => (/* binding */ getGeminiApiKey),
/* harmony export */   isApiKeyConfigured: () => (/* binding */ isApiKeyConfigured),
/* harmony export */   setGeminiApiKey: () => (/* binding */ setGeminiApiKey)
/* harmony export */ });
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/errors */ "./src/utils/errors.ts");
// src/background/config.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Valida o formato da API key do Google Gemini
 * @param apiKey - A API key para validar
 * @throws {ValidationError} Se a API key for inválida
 */
function validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
        throw _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.validationFailure('apiKey', apiKey, 'API key deve ser uma string não vazia');
    }
    const trimmedKey = apiKey.trim();
    if (trimmedKey.length === 0) {
        throw _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.validationFailure('apiKey', apiKey, 'API key não pode estar vazia');
    }
    if (!trimmedKey.startsWith('AIza')) {
        throw _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.invalidApiKey(trimmedKey);
    }
    if (trimmedKey.length < 35) {
        throw _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.invalidApiKey(trimmedKey);
    }
}
/**
 * Obtém a API key do Gemini do storage seguro
 * @returns Promise com a API key ou null se não configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
function getGeminiApiKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
            return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withTimeout)(() => __awaiter(this, void 0, void 0, function* () {
                const result = yield chrome.storage.sync.get(['geminiApiKey']);
                return result.geminiApiKey || null;
            }), 5000, 'getGeminiApiKey');
        }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('get', error));
    });
}
/**
 * Salva a API key do Gemini no storage seguro
 * @param apiKey - A API key para salvar
 * @throws {ValidationError} Se a API key for inválida
 * @throws {StorageError} Se houver erro ao salvar no storage
 */
function setGeminiApiKey(apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Valida a API key antes de salvar
        validateApiKey(apiKey);
        yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
            return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withTimeout)(() => __awaiter(this, void 0, void 0, function* () {
                yield chrome.storage.sync.set({
                    geminiApiKey: apiKey.trim(),
                    lastUpdated: Date.now()
                });
            }), 5000, 'setGeminiApiKey');
        }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('set', error));
    });
}
/**
 * Remove a API key do storage
 * @throws {StorageError} Se houver erro ao remover do storage
 */
function clearGeminiApiKey() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
            return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withTimeout)(() => __awaiter(this, void 0, void 0, function* () {
                yield chrome.storage.sync.remove(['geminiApiKey', 'lastUpdated']);
            }), 5000, 'clearGeminiApiKey');
        }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('remove', error));
    });
}
/**
 * Verifica se a API key está configurada
 * @returns Promise<boolean> - true se a API key está configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
function isApiKeyConfigured() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = yield getGeminiApiKey();
            return apiKey !== null && apiKey.length > 0;
        }
        catch (error) {
            // Se houver erro ao acessar storage, assumimos que não está configurada
            _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(error);
            return false;
        }
    });
}
/**
 * Obtém configurações completas da extensão
 * @returns Promise<ExtensionConfig> - Configurações da extensão
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
function getExtensionConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
            return (0,_utils_errors__WEBPACK_IMPORTED_MODULE_0__.withTimeout)(() => __awaiter(this, void 0, void 0, function* () {
                const result = yield chrome.storage.sync.get(['geminiApiKey', 'lastUpdated']);
                return {
                    geminiApiKey: result.geminiApiKey || undefined,
                    lastUpdated: result.lastUpdated || undefined
                };
            }), 5000, 'getExtensionConfig');
        }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('get', error));
    });
}


/***/ }),

/***/ "./src/utils/cache.ts":
/*!****************************!*\
  !*** ./src/utils/cache.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AIResponseCache: () => (/* binding */ AIResponseCache),
/* harmony export */   EvictionStrategy: () => (/* binding */ EvictionStrategy),
/* harmony export */   IntelligentCache: () => (/* binding */ IntelligentCache),
/* harmony export */   PageContextCache: () => (/* binding */ PageContextCache),
/* harmony export */   aiResponseCache: () => (/* binding */ aiResponseCache),
/* harmony export */   pageContextCache: () => (/* binding */ pageContextCache)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/utils/errors.ts");
// src/utils/cache.ts - Sistema de cache inteligente para performance
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Estratégias de eviction do cache
 */
var EvictionStrategy;
(function (EvictionStrategy) {
    EvictionStrategy["LRU"] = "lru";
    EvictionStrategy["LFU"] = "lfu";
    EvictionStrategy["TTL"] = "ttl";
})(EvictionStrategy || (EvictionStrategy = {}));
/**
 * Sistema de cache inteligente com múltiplas estratégias
 */
class IntelligentCache {
    constructor(config = {}) {
        this.cache = new Map();
        this.currentSize = 0;
        this.config = Object.assign({ maxSize: 10 * 1024 * 1024, maxItems: 1000, defaultTtl: 30 * 60 * 1000, cleanupInterval: 5 * 60 * 1000 }, config);
        this.startCleanupTimer();
    }
    /**
     * Adiciona item ao cache
     */
    set(key, data, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0,_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
                const now = Date.now();
                const itemTtl = ttl || this.config.defaultTtl;
                const size = this.estimateSize(data);
                // Remove item existente se houver
                if (this.cache.has(key)) {
                    this.remove(key);
                }
                // Verifica se precisa fazer eviction
                yield this.ensureSpace(size);
                const item = {
                    data,
                    timestamp: now,
                    ttl: itemTtl,
                    accessCount: 0,
                    lastAccessed: now,
                    size,
                };
                this.cache.set(key, item);
                this.currentSize += size;
                // Persiste no storage se necessário
                yield this.persistToStorage(key, item);
            }), (error) => _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_set', error));
        });
    }
    /**
     * Recupera item do cache
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0,_errors__WEBPACK_IMPORTED_MODULE_0__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
                let item = this.cache.get(key);
                // Se não está na memória, tenta carregar do storage
                if (!item) {
                    const storageItem = yield this.loadFromStorage(key);
                    if (storageItem) {
                        item = storageItem;
                        this.cache.set(key, item);
                        this.currentSize += item.size || 0;
                    }
                }
                if (!item) {
                    return null;
                }
                // Verifica se expirou
                const now = Date.now();
                if (now - item.timestamp > item.ttl) {
                    this.remove(key);
                    return null;
                }
                // Atualiza estatísticas de acesso
                item.accessCount++;
                item.lastAccessed = now;
                return item.data;
            }), (error) => _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_get', error.message || 'Cache get failed'));
        });
    }
    /**
     * Remove item do cache
     */
    remove(key) {
        const item = this.cache.get(key);
        if (item) {
            this.cache.delete(key);
            this.currentSize -= item.size || 0;
            this.removeFromStorage(key);
            return true;
        }
        return false;
    }
    /**
     * Limpa todo o cache
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cache.clear();
            this.currentSize = 0;
            yield this.clearStorage();
        });
    }
    /**
     * Verifica se item existe e não expirou
     */
    has(key) {
        const item = this.cache.get(key);
        if (!item)
            return false;
        const now = Date.now();
        if (now - item.timestamp > item.ttl) {
            this.remove(key);
            return false;
        }
        return true;
    }
    /**
     * Obtém estatísticas do cache
     */
    getStats() {
        const items = Array.from(this.cache.values());
        const totalAccess = items.reduce((sum, item) => sum + item.accessCount, 0);
        const totalPossibleAccess = items.length * Math.max(...items.map(i => i.accessCount), 1);
        return {
            size: this.currentSize,
            itemCount: this.cache.size,
            hitRate: totalPossibleAccess > 0 ? totalAccess / totalPossibleAccess : 0,
            memoryUsage: this.currentSize / this.config.maxSize,
            oldestItem: Math.min(...items.map(i => i.timestamp), Date.now()),
            newestItem: Math.max(...items.map(i => i.timestamp), 0),
        };
    }
    /**
     * Força limpeza do cache
     */
    cleanup() {
        const now = Date.now();
        const keysToRemove = [];
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => this.remove(key));
    }
    /**
     * Garante que há espaço suficiente no cache
     */
    ensureSpace(requiredSize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Se já tem espaço, não faz nada
            if (this.currentSize + requiredSize <= this.config.maxSize &&
                this.cache.size < this.config.maxItems) {
                return;
            }
            // Executa estratégias de eviction
            yield this.evictItems(requiredSize);
        });
    }
    /**
     * Remove itens usando estratégias de eviction
     */
    evictItems(requiredSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = Array.from(this.cache.entries());
            // Ordena por estratégia LRU (menos recentemente usado)
            items.sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);
            let freedSpace = 0;
            for (const [key] of items) {
                if (freedSpace >= requiredSize && this.cache.size < this.config.maxItems) {
                    break;
                }
                const item = this.cache.get(key);
                if (item) {
                    freedSpace += item.size || 0;
                    this.remove(key);
                }
            }
        });
    }
    /**
     * Estima o tamanho de um objeto em bytes
     */
    estimateSize(data) {
        try {
            return new Blob([JSON.stringify(data)]).size;
        }
        catch (_a) {
            // Fallback para estimativa simples
            return JSON.stringify(data).length * 2; // UTF-16
        }
    }
    /**
     * Persiste item no storage
     */
    persistToStorage(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageKey = `cache_${key}`;
                yield chrome.storage.local.set({ [storageKey]: item });
            }
            catch (error) {
                // Falha silenciosa - cache funciona apenas na memória
                _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_persist', error));
            }
        });
    }
    /**
     * Carrega item do storage
     */
    loadFromStorage(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageKey = `cache_${key}`;
                const result = yield chrome.storage.local.get([storageKey]);
                return result[storageKey] || null;
            }
            catch (error) {
                _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_load', error));
                return null;
            }
        });
    }
    /**
     * Remove item do storage
     */
    removeFromStorage(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageKey = `cache_${key}`;
                yield chrome.storage.local.remove([storageKey]);
            }
            catch (error) {
                // Falha silenciosa
                _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_remove', error));
            }
        });
    }
    /**
     * Limpa todo o storage do cache
     */
    clearStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield chrome.storage.local.get(null);
                const cacheKeys = Object.keys(result).filter(key => key.startsWith('cache_'));
                if (cacheKeys.length > 0) {
                    yield chrome.storage.local.remove(cacheKeys);
                }
            }
            catch (error) {
                _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.storageFailure('cache_clear', error));
            }
        });
    }
    /**
     * Inicia timer de limpeza automática
     */
    startCleanupTimer() {
        this.cleanupTimer = setInterval(() => {
            this.cleanup();
        }, this.config.cleanupInterval);
    }
    /**
     * Para timer de limpeza
     */
    destroy() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
        }
    }
}
/**
 * Cache específico para respostas da IA
 */
class AIResponseCache extends IntelligentCache {
    constructor() {
        super({
            maxSize: 5 * 1024 * 1024, // 5MB para respostas da IA
            maxItems: 100,
            defaultTtl: 60 * 60 * 1000, // 1 hora
        });
    }
    /**
     * Gera chave de cache baseada no contexto e prompt
     */
    generateKey(context, prompt) {
        const combined = `${context}_${prompt}`;
        return this.hashString(combined);
    }
    /**
     * Hash simples para gerar chaves
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }
}
/**
 * Cache para contextos de página
 */
class PageContextCache extends IntelligentCache {
    constructor() {
        super({
            maxSize: 2 * 1024 * 1024, // 2MB para contextos
            maxItems: 50,
            defaultTtl: 10 * 60 * 1000, // 10 minutos
        });
    }
    /**
     * Gera chave baseada na URL e hash do conteúdo
     */
    generateKey(url, contentHash) {
        return `${url}_${contentHash}`;
    }
}
// Instâncias globais dos caches
const aiResponseCache = new AIResponseCache();
const pageContextCache = new PageContextCache();


/***/ }),

/***/ "./src/utils/errors.ts":
/*!*****************************!*\
  !*** ./src/utils/errors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiKeyError: () => (/* binding */ ApiKeyError),
/* harmony export */   ErrorFactory: () => (/* binding */ ErrorFactory),
/* harmony export */   ErrorLogger: () => (/* binding */ ErrorLogger),
/* harmony export */   ExtensionError: () => (/* binding */ ExtensionError),
/* harmony export */   GeminiApiError: () => (/* binding */ GeminiApiError),
/* harmony export */   PageCaptureError: () => (/* binding */ PageCaptureError),
/* harmony export */   StorageError: () => (/* binding */ StorageError),
/* harmony export */   TimeoutError: () => (/* binding */ TimeoutError),
/* harmony export */   ValidationError: () => (/* binding */ ValidationError),
/* harmony export */   withErrorHandling: () => (/* binding */ withErrorHandling),
/* harmony export */   withTimeout: () => (/* binding */ withTimeout)
/* harmony export */ });
// src/utils/errors.ts - Sistema de tratamento de erros personalizado
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Classe base para erros da extensão
 */
class ExtensionError extends Error {
    constructor(message, context) {
        super(message);
        this.name = this.constructor.name;
        this.timestamp = Date.now();
        this.context = context;
        // Mantém o stack trace correto
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    /**
     * Converte o erro para um objeto serializável
     */
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            userMessage: this.userMessage,
            timestamp: this.timestamp,
            context: this.context,
            stack: this.stack,
        };
    }
}
/**
 * Erro relacionado à configuração da API key
 */
class ApiKeyError extends ExtensionError {
    constructor(message, userMessage, context) {
        super(message, context);
        this.userMessage = userMessage;
        this.code = 'API_KEY_ERROR';
    }
}
/**
 * Erro de comunicação com a API do Gemini
 */
class GeminiApiError extends ExtensionError {
    constructor(message, userMessage, statusCode, context) {
        super(message, Object.assign(Object.assign({}, context), { statusCode }));
        this.userMessage = userMessage;
        this.statusCode = statusCode;
        this.code = 'GEMINI_API_ERROR';
    }
}
/**
 * Erro de storage do Chrome
 */
class StorageError extends ExtensionError {
    constructor(message, userMessage, context) {
        super(message, context);
        this.userMessage = userMessage;
        this.code = 'STORAGE_ERROR';
    }
}
/**
 * Erro de captura de página
 */
class PageCaptureError extends ExtensionError {
    constructor(message, userMessage, context) {
        super(message, context);
        this.userMessage = userMessage;
        this.code = 'PAGE_CAPTURE_ERROR';
    }
}
/**
 * Erro de validação de dados
 */
class ValidationError extends ExtensionError {
    constructor(message, userMessage, field, context) {
        super(message, Object.assign(Object.assign({}, context), { field }));
        this.userMessage = userMessage;
        this.field = field;
        this.code = 'VALIDATION_ERROR';
    }
}
/**
 * Erro de timeout
 */
class TimeoutError extends ExtensionError {
    constructor(message, userMessage, timeoutMs, context) {
        super(message, Object.assign(Object.assign({}, context), { timeoutMs }));
        this.userMessage = userMessage;
        this.timeoutMs = timeoutMs;
        this.code = 'TIMEOUT_ERROR';
    }
}
/**
 * Utilitário para criar erros baseados em diferentes tipos de falha
 */
class ErrorFactory {
    static apiKeyNotConfigured() {
        return new ApiKeyError('Gemini API key is not configured', 'API key do Gemini não configurada. Por favor, configure nas opções da extensão.', { action: 'configure_api_key' });
    }
    static invalidApiKey(key) {
        return new ApiKeyError(`Invalid API key format: ${key.substring(0, 8)}...`, 'Formato de API key inválido. Verifique se você copiou a chave corretamente.', { keyPrefix: key.substring(0, 8) });
    }
    static geminiApiFailure(error, statusCode) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || 'Unknown Gemini API error';
        let userMessage = 'Erro ao comunicar com a IA. Tente novamente em alguns momentos.';
        if (statusCode === 429) {
            userMessage = 'Muitas requisições. Aguarde um momento antes de tentar novamente.';
        }
        else if (statusCode === 401) {
            userMessage = 'API key inválida. Verifique sua configuração.';
        }
        else if (statusCode === 403) {
            userMessage = 'Acesso negado. Verifique se sua API key tem as permissões necessárias.';
        }
        return new GeminiApiError(message, userMessage, statusCode, { originalError: error });
    }
    static storageFailure(operation, error) {
        return new StorageError(`Storage ${operation} failed: ${(error === null || error === void 0 ? void 0 : error.message) || 'Unknown error'}`, 'Erro ao acessar configurações. Tente recarregar a extensão.', { operation, originalError: error });
    }
    static pageCaptureFailure(error) {
        return new PageCaptureError(`Failed to capture page: ${(error === null || error === void 0 ? void 0 : error.message) || 'Unknown error'}`, 'Não foi possível capturar a página. Verifique se a página está carregada completamente.', { originalError: error });
    }
    static validationFailure(field, value, reason) {
        return new ValidationError(`Validation failed for ${field}: ${reason}`, `Valor inválido para ${field}: ${reason}`, field, { value, reason });
    }
    static timeoutFailure(operation, timeoutMs) {
        return new TimeoutError(`Operation ${operation} timed out after ${timeoutMs}ms`, 'Operação demorou muito para responder. Tente novamente.', timeoutMs, { operation });
    }
}
/**
 * Logger centralizado para erros
 */
class ErrorLogger {
    /**
     * Registra um erro no log
     */
    static log(error) {
        this.logs.push({ error, timestamp: Date.now() });
        // Mantém apenas os últimos MAX_LOGS
        if (this.logs.length > this.MAX_LOGS) {
            this.logs = this.logs.slice(-this.MAX_LOGS);
        }
        // Log no console para desenvolvimento
        console.error(`[${error.code}] ${error.message}`, {
            userMessage: error.userMessage,
            context: error.context,
            stack: error.stack,
        });
    }
    /**
     * Obtém todos os logs de erro
     */
    static getLogs() {
        return [...this.logs];
    }
    /**
     * Limpa todos os logs
     */
    static clearLogs() {
        this.logs = [];
    }
    /**
     * Obtém estatísticas dos erros
     */
    static getStats() {
        const stats = {};
        this.logs.forEach(({ error }) => {
            stats[error.code] = (stats[error.code] || 0) + 1;
        });
        return stats;
    }
}
ErrorLogger.MAX_LOGS = 100;
ErrorLogger.logs = [];
/**
 * Wrapper para operações assíncronas com tratamento de erro
 */
function withErrorHandling(operation, errorFactory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield operation();
        }
        catch (error) {
            // Se já é um ExtensionError (como TimeoutError), preserva o tipo original
            if (error instanceof ExtensionError) {
                ErrorLogger.log(error);
                throw error;
            }
            const extensionError = errorFactory(error);
            ErrorLogger.log(extensionError);
            throw extensionError;
        }
    });
}
/**
 * Wrapper para operações com timeout
 */
function withTimeout(operation, timeoutMs, operationName) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const error = ErrorFactory.timeoutFailure(operationName, timeoutMs);
                ErrorLogger.log(error);
                reject(error);
            }, timeoutMs);
            operation()
                .then(resolve)
                .catch(reject)
                .finally(() => clearTimeout(timer));
        });
    });
}


/***/ }),

/***/ "./src/utils/fullPageCapture.ts":
/*!**************************************!*\
  !*** ./src/utils/fullPageCapture.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureFullPage: () => (/* binding */ captureFullPage),
/* harmony export */   compressScreenshot: () => (/* binding */ compressScreenshot),
/* harmony export */   getPageDimensions: () => (/* binding */ getPageDimensions)
/* harmony export */ });
// src/utils/fullPageCapture.ts - Sistema de Captura de Página Completa
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Captura as dimensões completas da página
 */
function getPageDimensions(tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const results = yield chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
                return {
                    width: Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth),
                    height: Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight,
                    scrollWidth: document.documentElement.scrollWidth,
                    scrollHeight: document.documentElement.scrollHeight
                };
            }
        });
        if (!((_a = results[0]) === null || _a === void 0 ? void 0 : _a.result)) {
            throw new Error('Falha ao obter dimensões da página');
        }
        return results[0].result;
    });
}
/**
 * Captura página completa usando abordagem mais simples e rápida
 * Minimiza o tempo de scroll para reduzir impacto visual
 */
function captureFullPageWithoutScroll(tabId, windowId, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        // 1. Salvar posição atual do usuário
        const originalPosition = yield chrome.scripting.executeScript({
            target: { tabId },
            func: () => ({ x: window.scrollX, y: window.scrollY })
        });
        const originalScroll = ((_a = originalPosition[0]) === null || _a === void 0 ? void 0 : _a.result) || { x: 0, y: 0 };
        // 2. Obter dimensões da página
        const dimensions = yield getPageDimensions(tabId);
        // 3. Calcular segmentos
        const maxHeight = options.maxHeight || 8000;
        const effectiveHeight = Math.min(dimensions.height, maxHeight);
        const viewportHeight = dimensions.viewportHeight;
        const segmentCount = Math.ceil(effectiveHeight / viewportHeight);
        console.log(`[FullPageCapture] Capturando ${segmentCount} segmentos rapidamente...`);
        const screenshots = [];
        // 4. Capturar cada segmento respeitando rate limits do Chrome
        for (let i = 0; i < segmentCount; i++) {
            const yPosition = i * viewportHeight;
            // Scroll instantâneo para a posição
            yield chrome.scripting.executeScript({
                target: { tabId },
                func: (y) => {
                    window.scrollTo({
                        top: y,
                        left: 0,
                        behavior: 'instant'
                    });
                },
                args: [yPosition]
            });
            // Aguardar renderização + rate limit (aumentado para evitar quota)
            const waitTime = Math.max(200, options.waitTime || 200);
            yield new Promise(resolve => setTimeout(resolve, waitTime));
            try {
                // Capturar screenshot com retry em caso de rate limit
                const screenshot = yield chrome.tabs.captureVisibleTab(windowId, {
                    format: options.format || 'jpeg',
                    quality: options.quality || 70
                });
                if (!screenshot) {
                    throw new Error(`Screenshot vazio para segmento ${i + 1}`);
                }
                screenshots.push(screenshot);
                console.log(`[FullPageCapture] Segmento ${i + 1}/${segmentCount} capturado`);
            }
            catch (error) {
                if (((_b = error === null || error === void 0 ? void 0 : error.message) === null || _b === void 0 ? void 0 : _b.includes('quota')) || ((_c = error === null || error === void 0 ? void 0 : error.message) === null || _c === void 0 ? void 0 : _c.includes('rate'))) {
                    console.warn(`[FullPageCapture] Rate limit atingido, aguardando 1s...`);
                    yield new Promise(resolve => setTimeout(resolve, 1000));
                    // Retry uma vez
                    try {
                        const screenshot = yield chrome.tabs.captureVisibleTab(windowId, {
                            format: options.format || 'jpeg',
                            quality: options.quality || 70
                        });
                        if (!screenshot) {
                            throw new Error(`Screenshot vazio para segmento ${i + 1} (retry)`);
                        }
                        screenshots.push(screenshot);
                        console.log(`[FullPageCapture] Segmento ${i + 1}/${segmentCount} capturado (retry)`);
                    }
                    catch (retryError) {
                        console.error(`[FullPageCapture] Falha no retry do segmento ${i + 1}:`, retryError);
                        throw new Error(`Falha na captura do segmento ${i + 1}: ${retryError}`);
                    }
                }
                else {
                    console.error(`[FullPageCapture] Erro no segmento ${i + 1}:`, error);
                    throw error;
                }
            }
        }
        // 5. Restaurar posição original IMEDIATAMENTE
        yield chrome.scripting.executeScript({
            target: { tabId },
            func: (pos) => {
                window.scrollTo({
                    top: pos.y,
                    left: pos.x,
                    behavior: 'instant'
                });
            },
            args: [originalScroll]
        });
        console.log('[FullPageCapture] Posição original restaurada');
        return screenshots;
    });
}
/**
 * Une múltiplos screenshots usando OffscreenCanvas (funciona em background)
 */
function stitchScreenshots(screenshots, dimensions, viewportHeight) {
    return __awaiter(this, void 0, void 0, function* () {
        // Usar OffscreenCanvas para funcionar em background script
        const canvas = new OffscreenCanvas(dimensions.viewportWidth, Math.min(dimensions.height, screenshots.length * viewportHeight));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Não foi possível criar contexto do OffscreenCanvas');
        }
        // Carregar e desenhar todas as imagens
        for (let i = 0; i < screenshots.length; i++) {
            const screenshot = screenshots[i];
            const yPosition = i * viewportHeight;
            // Converter base64 para ImageBitmap
            const response = yield fetch(screenshot);
            const blob = yield response.blob();
            const imageBitmap = yield createImageBitmap(blob);
            // Desenhar no canvas
            ctx.drawImage(imageBitmap, 0, yPosition);
            // Limpar memória
            imageBitmap.close();
        }
        // Converter para blob e depois para data URL
        const blob = yield canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Erro ao converter blob para data URL'));
            reader.readAsDataURL(blob);
        });
    });
}
/**
 * Extrai contexto HTML e texto da página completa
 */
function extractFullPageContext(tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const results = yield chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
                // Função para extrair conteúdo relevante
                const extractContent = () => {
                    // Priorizar elementos principais de conteúdo
                    const mainContentElement = document.querySelector('main') ||
                        document.querySelector('article') ||
                        document.querySelector('[role="main"]') ||
                        document.querySelector('.content') ||
                        document.querySelector('#content') ||
                        document.querySelector('ytd-two-column-browse-results-renderer') || // YouTube
                        document.body;
                    const bodyClone = mainContentElement.cloneNode(true);
                    // Remover elementos desnecessários
                    const elementsToRemove = [
                        'script', 'style', 'svg', 'noscript', 'nav', 'footer',
                        'aside', '#secondary', '.ads', '.advertisement',
                        '[data-ad]', '.sidebar', '.menu'
                    ];
                    elementsToRemove.forEach(selector => {
                        bodyClone.querySelectorAll(selector).forEach(el => el.remove());
                    });
                    // Extrair texto de elementos importantes
                    const importantSelectors = [
                        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                        'p', 'article', 'section',
                        '.title', '.heading', '.description',
                        '[data-testid*="title"]', '[data-testid*="description"]'
                    ];
                    let structuredText = '';
                    importantSelectors.forEach(selector => {
                        const elements = bodyClone.querySelectorAll(selector);
                        elements.forEach(el => {
                            var _a;
                            const text = (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                            if (text && text.length > 10) {
                                structuredText += `${selector.toUpperCase()}: ${text}\n`;
                            }
                        });
                    });
                    return {
                        title: document.title,
                        htmlContent: bodyClone.innerHTML,
                        textContent: bodyClone.innerText,
                        structuredText: structuredText,
                        url: window.location.href
                    };
                };
                return extractContent();
            }
        });
        if (!((_a = results[0]) === null || _a === void 0 ? void 0 : _a.result)) {
            throw new Error('Falha ao extrair contexto da página');
        }
        const result = results[0].result;
        return {
            htmlContext: result.htmlContent,
            textContext: result.structuredText || result.textContent,
            title: result.title
        };
    });
}
/**
 * Função principal para capturar página completa SEM scroll visível
 */
function captureFullPage(tabId_1, windowId_1) {
    return __awaiter(this, arguments, void 0, function* (tabId, windowId, options = {}) {
        const startTime = Date.now();
        try {
            // 1. Obter dimensões da página
            console.log('[FullPageCapture] Obtendo dimensões da página...');
            const dimensions = yield getPageDimensions(tabId);
            // 2. Calcular quantos segmentos precisamos
            const maxHeight = options.maxHeight || 8000;
            const effectiveHeight = Math.min(dimensions.height, maxHeight);
            const viewportHeight = dimensions.viewportHeight;
            const segmentCount = Math.ceil(effectiveHeight / viewportHeight);
            console.log(`[FullPageCapture] Página: ${dimensions.width}x${dimensions.height}px`);
            console.log(`[FullPageCapture] Capturando ${segmentCount} segmentos SEM scroll visível...`);
            // 3. Capturar todos os segmentos sem afetar o usuário
            const screenshots = yield captureFullPageWithoutScroll(tabId, windowId, options);
            // 4. Unir screenshots
            console.log('[FullPageCapture] Unindo screenshots...');
            const fullScreenshot = yield stitchScreenshots(screenshots, dimensions, viewportHeight);
            // 5. Extrair contexto da página
            console.log('[FullPageCapture] Extraindo contexto...');
            const context = yield extractFullPageContext(tabId);
            const result = {
                screenshot: fullScreenshot,
                dimensions,
                htmlContext: context.htmlContext,
                textContext: context.textContext,
                title: context.title,
                url: (yield chrome.tabs.get(tabId)).url || '',
                captureTime: Date.now() - startTime,
                segments: segmentCount
            };
            console.log(`[FullPageCapture] Captura completa em ${result.captureTime}ms SEM afetar o usuário`);
            return result;
        }
        catch (error) {
            console.error('[FullPageCapture] Erro durante captura:', error);
            throw new Error(`Falha na captura de página completa: ${error}`);
        }
    });
}
/**
 * Função utilitária para comprimir screenshot se necessário
 */
function compressScreenshot(dataUrl, maxSizeKB = 1024) {
    // Se a imagem for menor que o limite, retorna como está
    const sizeKB = (dataUrl.length * 3 / 4) / 1024; // Aproximação do tamanho em KB
    if (sizeKB <= maxSizeKB) {
        return dataUrl;
    }
    // Criar canvas para recompressão
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    return new Promise((resolve) => {
        img.onload = () => {
            // Reduzir qualidade progressivamente até atingir o tamanho desejado
            let quality = 0.8;
            let compressed = dataUrl;
            while (quality > 0.1) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0);
                compressed = canvas.toDataURL('image/jpeg', quality);
                const newSizeKB = (compressed.length * 3 / 4) / 1024;
                if (newSizeKB <= maxSizeKB) {
                    break;
                }
                quality -= 0.1;
            }
            resolve(compressed);
        };
        img.src = dataUrl;
    }); // Type assertion para compatibilidade
}


/***/ }),

/***/ "./src/utils/performance.ts":
/*!**********************************!*\
  !*** ./src/utils/performance.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BatchProcessor: () => (/* binding */ BatchProcessor),
/* harmony export */   DataCompressor: () => (/* binding */ DataCompressor),
/* harmony export */   ImageOptimizer: () => (/* binding */ ImageOptimizer),
/* harmony export */   LazyLoader: () => (/* binding */ LazyLoader),
/* harmony export */   PerformanceMonitor: () => (/* binding */ PerformanceMonitor),
/* harmony export */   WorkerPool: () => (/* binding */ WorkerPool),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   memoize: () => (/* binding */ memoize),
/* harmony export */   performanceMonitor: () => (/* binding */ performanceMonitor),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/utils/errors.ts");
// src/utils/performance.ts - Sistema de otimizações de performance
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Debounce function para limitar chamadas frequentes
 */
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
/**
 * Throttle function para limitar taxa de execução
 */
function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
/**
 * Memoização para funções puras
 */
function memoize(func, getKey) {
    const cache = new Map();
    return ((...args) => {
        const key = getKey ? getKey(...args) : JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    });
}
/**
 * Lazy loading para recursos pesados
 */
class LazyLoader {
    constructor(loader) {
        this.promise = null;
        this.result = null;
        this.loader = loader;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.result) {
                return this.result;
            }
            if (!this.promise) {
                this.promise = this.loader();
            }
            this.result = yield this.promise;
            return this.result;
        });
    }
    isLoaded() {
        return this.result !== null;
    }
    reset() {
        this.promise = null;
        this.result = null;
    }
}
/**
 * Pool de workers para processamento paralelo
 */
class WorkerPool {
    constructor(workerScript, poolSize = 4) {
        this.workers = [];
        this.availableWorkers = [];
        this.taskQueue = [];
        for (let i = 0; i < poolSize; i++) {
            const worker = new Worker(workerScript);
            this.workers.push(worker);
            this.availableWorkers.push(worker);
        }
    }
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.taskQueue.push({ task, resolve, reject });
                this.processQueue();
            });
        });
    }
    processQueue() {
        if (this.taskQueue.length === 0 || this.availableWorkers.length === 0) {
            return;
        }
        const worker = this.availableWorkers.pop();
        const { task, resolve, reject } = this.taskQueue.shift();
        const handleMessage = (event) => {
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
            this.availableWorkers.push(worker);
            resolve(event.data);
            this.processQueue();
        };
        const handleError = (error) => {
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
            this.availableWorkers.push(worker);
            reject(error);
            this.processQueue();
        };
        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);
        worker.postMessage(task);
    }
    destroy() {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
        this.availableWorkers = [];
        this.taskQueue = [];
    }
}
/**
 * Compressão de dados para reduzir uso de memória
 */
class DataCompressor {
    /**
     * Comprime string usando algoritmo simples
     */
    static compress(data) {
        try {
            // Usa compressão simples baseada em repetições
            return this.simpleCompress(data);
        }
        catch (error) {
            _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.validationFailure('compression', data, 'Failed to compress'));
            return data; // Fallback para dados não comprimidos
        }
    }
    /**
     * Descomprime string
     */
    static decompress(compressedData) {
        try {
            return this.simpleDecompress(compressedData);
        }
        catch (error) {
            _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.validationFailure('decompression', compressedData, 'Failed to decompress'));
            return compressedData; // Fallback
        }
    }
    /**
     * Compressão simples para fallback
     */
    static simpleCompress(data) {
        const result = [];
        let i = 0;
        while (i < data.length) {
            let count = 1;
            const char = data[i];
            while (i + count < data.length && data[i + count] === char && count < 255) {
                count++;
            }
            if (count > 3) {
                result.push(`${count}${char}`);
            }
            else {
                result.push(char.repeat(count));
            }
            i += count;
        }
        return result.join('');
    }
    /**
     * Descompressão simples
     */
    static simpleDecompress(data) {
        return data.replace(/(\d+)(.)/g, (match, count, char) => {
            const num = parseInt(count, 10);
            return num > 3 ? char.repeat(num) : match;
        });
    }
}
/**
 * Monitor de performance para métricas
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }
    /**
     * Mede tempo de execução de uma função
     */
    measure(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = performance.now();
            try {
                const result = yield fn();
                this.recordMetric(name, performance.now() - startTime);
                return result;
            }
            catch (error) {
                this.recordMetric(name, performance.now() - startTime, true);
                throw error;
            }
        });
    }
    /**
     * Registra métrica manualmente
     */
    recordMetric(name, time, isError = false) {
        const existing = this.metrics.get(name) || {
            count: 0,
            totalTime: 0,
            minTime: Infinity,
            maxTime: 0,
            lastTime: 0,
        };
        existing.count++;
        existing.totalTime += time;
        existing.minTime = Math.min(existing.minTime, time);
        existing.maxTime = Math.max(existing.maxTime, time);
        existing.lastTime = time;
        this.metrics.set(name, existing);
        // Log métricas críticas
        if (time > 5000) { // Mais de 5 segundos
            _errors__WEBPACK_IMPORTED_MODULE_0__.ErrorLogger.log(_errors__WEBPACK_IMPORTED_MODULE_0__.ErrorFactory.timeoutFailure(name, time));
        }
    }
    /**
     * Obtém estatísticas de performance
     */
    getStats() {
        const stats = {};
        for (const [name, metric] of this.metrics.entries()) {
            stats[name] = {
                count: metric.count,
                avgTime: metric.totalTime / metric.count,
                minTime: metric.minTime === Infinity ? 0 : metric.minTime,
                maxTime: metric.maxTime,
                lastTime: metric.lastTime,
            };
        }
        return stats;
    }
    /**
     * Limpa métricas antigas
     */
    clearStats() {
        this.metrics.clear();
    }
}
/**
 * Otimizador de imagens para reduzir tamanho
 */
class ImageOptimizer {
    /**
     * Reduz qualidade de imagem base64
     */
    static optimizeBase64Image(base64Data, quality = 0.7, maxWidth = 1920, maxHeight = 1080) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                // Calcula dimensões otimizadas
                let { width, height } = this.calculateOptimalDimensions(img.width, img.height, maxWidth, maxHeight);
                canvas.width = width;
                canvas.height = height;
                // Desenha imagem redimensionada
                ctx.drawImage(img, 0, 0, width, height);
                // Converte para base64 com qualidade reduzida
                const optimizedData = canvas.toDataURL('image/jpeg', quality);
                resolve(optimizedData);
            };
            img.src = base64Data;
        });
    }
    /**
     * Calcula dimensões ótimas mantendo aspect ratio
     */
    static calculateOptimalDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
        const aspectRatio = originalWidth / originalHeight;
        let width = originalWidth;
        let height = originalHeight;
        if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
        }
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        return { width: Math.round(width), height: Math.round(height) };
    }
}
/**
 * Batch processor para operações em lote
 */
class BatchProcessor {
    constructor(processor, batchSize = 10, delay = 100) {
        this.queue = [];
        this.processing = false;
        this.processor = processor;
        this.batchSize = batchSize;
        this.delay = delay;
    }
    add(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.queue.push(item);
                // Adiciona resolver para este item específico
                const itemIndex = this.queue.length - 1;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    if (!this.processing) {
                        try {
                            const results = yield this.processBatch();
                            resolve(results[itemIndex]);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                }), this.delay);
            });
        });
    }
    processBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.processing || this.queue.length === 0) {
                return [];
            }
            this.processing = true;
            const batch = this.queue.splice(0, this.batchSize);
            try {
                const results = yield this.processor(batch);
                return results;
            }
            finally {
                this.processing = false;
                // Processa próximo batch se houver itens na fila
                if (this.queue.length > 0) {
                    setTimeout(() => this.processBatch(), this.delay);
                }
            }
        });
    }
}
// Instâncias globais
const performanceMonitor = new PerformanceMonitor();


/***/ }),

/***/ "./src/utils/webSearch.ts":
/*!********************************!*\
  !*** ./src/utils/webSearch.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkWebSearchAvailability: () => (/* binding */ checkWebSearchAvailability),
/* harmony export */   combineSearchWithPageContext: () => (/* binding */ combineSearchWithPageContext),
/* harmony export */   extractSearchQuery: () => (/* binding */ extractSearchQuery),
/* harmony export */   needsWebSearch: () => (/* binding */ needsWebSearch),
/* harmony export */   performWebSearch: () => (/* binding */ performWebSearch)
/* harmony export */ });
// src/utils/webSearch.ts - Sistema de Pesquisa Web Inteligente
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Detecta se uma resposta da IA indica necessidade de pesquisa web
 */
function needsWebSearch(aiResponse, userQuestion) {
    const needsSearchIndicators = [
        'não está aqui nesta página',
        'não consigo encontrar',
        'não está visível',
        'preciso de mais informações',
        'não tenho informações sobre',
        'não está disponível na página',
        'precisa pesquisar',
        'informação não está presente',
        'não posso ver',
        'não está mostrado'
    ];
    const responseText = aiResponse.toLowerCase();
    const questionText = userQuestion.toLowerCase();
    // Verifica se a resposta indica falta de informação
    const hasNeedsIndicator = needsSearchIndicators.some(indicator => responseText.includes(indicator));
    // Verifica se a pergunta é sobre algo específico que pode precisar de busca
    const isSpecificQuestion = [
        'como', 'quando', 'onde', 'por que', 'quem', 'qual',
        'preço', 'valor', 'custo', 'data', 'horário',
        'contato', 'telefone', 'endereço', 'email',
        'novidades', 'notícias', 'atualização'
    ].some(keyword => questionText.includes(keyword));
    return hasNeedsIndicator || (isSpecificQuestion && responseText.length < 200);
}
/**
 * Extrai termos de busca relevantes do contexto e pergunta do usuário
 */
function extractSearchQuery(userQuestion, pageContext, pageUrl) {
    // Limpar e normalizar a pergunta
    let query = userQuestion.trim();
    // Remover palavras de parada comuns
    const stopWords = [
        'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
        'em', 'no', 'na', 'nos', 'nas', 'para', 'por', 'com', 'sem',
        'que', 'qual', 'quais', 'como', 'quando', 'onde', 'por que', 'porque',
        'me', 'te', 'se', 'nos', 'vos', 'lhe', 'lhes',
        'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
        'aquele', 'aquela', 'aqueles', 'aquelas'
    ];
    // Extrair entidades importantes do contexto da página
    const pageEntities = extractEntitiesFromContext(pageContext);
    // Adicionar contexto relevante da página à busca
    if (pageEntities.length > 0) {
        const mainEntity = pageEntities[0];
        if (!query.toLowerCase().includes(mainEntity.toLowerCase())) {
            query = `${mainEntity} ${query}`;
        }
    }
    // Adicionar domínio se relevante
    if (pageUrl) {
        const domain = new URL(pageUrl).hostname.replace('www.', '');
        const siteName = domain.split('.')[0];
        // Adicionar site se for relevante para a busca
        if (['youtube', 'amazon', 'mercadolivre', 'olx', 'linkedin'].includes(siteName)) {
            query = `site:${domain} ${query}`;
        }
    }
    return query.trim();
}
/**
 * Extrai entidades importantes do contexto da página
 */
function extractEntitiesFromContext(context) {
    const entities = [];
    // Extrair títulos e cabeçalhos (geralmente são entidades importantes)
    const titleMatches = context.match(/H[1-6]: ([^\\n]+)/g);
    if (titleMatches) {
        titleMatches.forEach(match => {
            const title = match.replace(/H[1-6]: /, '').trim();
            if (title.length > 3 && title.length < 100) {
                entities.push(title);
            }
        });
    }
    // Extrair nomes próprios (palavras capitalizadas)
    const properNouns = context.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
    if (properNouns) {
        properNouns.forEach(noun => {
            if (noun.length > 3 && noun.length < 50 && !entities.includes(noun)) {
                entities.push(noun);
            }
        });
    }
    return entities.slice(0, 3); // Retornar apenas as 3 mais relevantes
}
/**
 * Realiza pesquisa usando Google Custom Search API
 */
function searchGoogle(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, options = {}) {
        var _a;
        const startTime = Date.now();
        // Configurações da API (você precisará configurar essas chaves)
        const API_KEY = yield getGoogleSearchApiKey();
        const SEARCH_ENGINE_ID = yield getGoogleSearchEngineId();
        if (!API_KEY || !SEARCH_ENGINE_ID) {
            throw new Error('Google Search API não configurada');
        }
        const params = new URLSearchParams({
            key: API_KEY,
            cx: SEARCH_ENGINE_ID,
            q: query,
            num: Math.min(options.maxResults || 5, 10).toString(),
            safe: options.safeSearch ? 'active' : 'off',
            lr: options.language || 'lang_pt',
            gl: options.region || 'br'
        });
        if (options.timeRange) {
            const timeMap = {
                'day': 'd1',
                'week': 'w1',
                'month': 'm1',
                'year': 'y1'
            };
            params.append('dateRestrict', timeMap[options.timeRange]);
        }
        const response = yield fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
        if (!response.ok) {
            throw new Error(`Google Search API error: ${response.status}`);
        }
        const data = yield response.json();
        const results = (data.items || []).map((item, index) => ({
            title: item.title,
            url: item.link,
            snippet: item.snippet,
            displayUrl: item.displayLink,
            position: index + 1
        }));
        return {
            query,
            results,
            totalResults: parseInt(((_a = data.searchInformation) === null || _a === void 0 ? void 0 : _a.totalResults) || '0'),
            searchTime: Date.now() - startTime,
            source: 'google'
        };
    });
}
/**
 * Realiza pesquisa usando SerpAPI (alternativa mais simples)
 */
function searchSerpAPI(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, options = {}) {
        var _a;
        const startTime = Date.now();
        const API_KEY = yield getSerpApiKey();
        if (!API_KEY) {
            throw new Error('SerpAPI não configurada');
        }
        const params = new URLSearchParams({
            api_key: API_KEY,
            engine: 'google',
            q: query,
            num: Math.min(options.maxResults || 5, 10).toString(),
            hl: options.language || 'pt',
            gl: options.region || 'br',
            safe: options.safeSearch ? 'active' : 'off'
        });
        const response = yield fetch(`https://serpapi.com/search?${params}`);
        if (!response.ok) {
            throw new Error(`SerpAPI error: ${response.status}`);
        }
        const data = yield response.json();
        const results = (data.organic_results || []).map((item, index) => ({
            title: item.title,
            url: item.link,
            snippet: item.snippet,
            displayUrl: item.displayed_link,
            position: index + 1
        }));
        return {
            query,
            results,
            totalResults: ((_a = data.search_information) === null || _a === void 0 ? void 0 : _a.total_results) || 0,
            searchTime: Date.now() - startTime,
            source: 'serpapi'
        };
    });
}
/**
 * Função principal de pesquisa web com fallback
 */
function performWebSearch(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, options = {}) {
        console.log(`[WebSearch] Pesquisando: "${query}"`);
        try {
            // Tentar SerpAPI primeiro (mais simples de configurar)
            return yield searchSerpAPI(query, options);
        }
        catch (serpError) {
            console.warn('[WebSearch] SerpAPI falhou, tentando Google:', serpError);
            try {
                // Fallback para Google Custom Search
                return yield searchGoogle(query, options);
            }
            catch (googleError) {
                console.error('[WebSearch] Todas as APIs falharam:', { serpError, googleError });
                throw new Error('Pesquisa web indisponível no momento');
            }
        }
    });
}
/**
 * Combina resultados de pesquisa com contexto da página
 */
function combineSearchWithPageContext(pageContext, searchResults, userQuestion) {
    const searchSummary = searchResults.results
        .slice(0, 3) // Usar apenas os 3 primeiros resultados
        .map(result => `**${result.title}**\n${result.snippet}\nFonte: ${result.displayUrl}`)
        .join('\n\n');
    return `CONTEXTO DA PÁGINA ATUAL:
${pageContext}

INFORMAÇÕES ADICIONAIS DA WEB (pesquisa: "${searchResults.query}"):
${searchSummary}

PERGUNTA DO USUÁRIO: ${userQuestion}

Use tanto o contexto da página quanto as informações da web para fornecer uma resposta completa e útil.`;
}
// Funções para obter chaves de API (implementar conforme necessário)
function getGoogleSearchApiKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get('googleSearchApiKey');
        return result.googleSearchApiKey || null;
    });
}
function getGoogleSearchEngineId() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get('googleSearchEngineId');
        return result.googleSearchEngineId || null;
    });
}
function getSerpApiKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get('serpApiKey');
        return result.serpApiKey || null;
    });
}
/**
 * Função utilitária para testar se as APIs estão configuradas
 */
function checkWebSearchAvailability() {
    return __awaiter(this, void 0, void 0, function* () {
        const serpApiKey = yield getSerpApiKey();
        const googleApiKey = yield getGoogleSearchApiKey();
        const googleEngineId = yield getGoogleSearchEngineId();
        const serpapi = !!serpApiKey;
        const google = !!(googleApiKey && googleEngineId);
        return {
            serpapi,
            google,
            available: serpapi || google
        };
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/background/main.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/generative-ai */ "./node_modules/@google/generative-ai/dist/index.mjs");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/background/config.ts");
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/errors */ "./src/utils/errors.ts");
/* harmony import */ var _utils_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/cache */ "./src/utils/cache.ts");
/* harmony import */ var _utils_performance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/performance */ "./src/utils/performance.ts");
/* harmony import */ var _utils_fullPageCapture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/fullPageCapture */ "./src/utils/fullPageCapture.ts");
/* harmony import */ var _utils_webSearch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/webSearch */ "./src/utils/webSearch.ts");
// src/background/main.ts - VERSÃO COM CACHE, PERFORMANCE E TRATAMENTO DE ERROS ROBUSTO
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







// Instância global que será inicializada quando necessário
let genAI = null;
let model = null;
// Funções auxiliares para cache e performance
const throttledAIRequest = (0,_utils_performance__WEBPACK_IMPORTED_MODULE_4__.throttle)(makeAIRequest, 1000);
/**
 * Gera chave de cache baseada no conteúdo da página
 */
function generateCacheKey(url, content) {
    const contentHash = btoa(content.substring(0, 1000)).substring(0, 32);
    return `${url}_${contentHash}`;
}
/**
 * Função genérica para fazer requisições à IA com cache e retry
 */
function makeAIRequest(prompt, parts, cacheKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return _utils_performance__WEBPACK_IMPORTED_MODULE_4__.performanceMonitor.measure('ai_request', () => __awaiter(this, void 0, void 0, function* () {
            // Verifica cache se a chave foi fornecida
            if (cacheKey) {
                const cached = yield _utils_cache__WEBPACK_IMPORTED_MODULE_3__.aiResponseCache.get(cacheKey);
                if (cached) {
                    console.log(`[CACHE] Cache hit for key: ${cacheKey}`);
                    return { response: { text: () => cached } };
                }
            }
            // Implementa retry com timeouts progressivos
            const maxRetries = 2;
            const timeouts = [10000, 20000]; // 10s, 20s
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                try {
                    console.log(`[AI] Tentativa ${attempt + 1}/${maxRetries + 1} - Timeout: ${timeouts[attempt] || 20000}ms`);
                    const result = yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withTimeout)(() => model.generateContent([prompt, ...parts]), timeouts[attempt] || 20000, `ai_request_attempt_${attempt + 1}`);
                    const responseText = result.response.text();
                    // Armazena no cache se a chave foi fornecida
                    if (cacheKey && responseText) {
                        yield _utils_cache__WEBPACK_IMPORTED_MODULE_3__.aiResponseCache.set(cacheKey, responseText);
                        console.log(`[CACHE] Cache stored for key: ${cacheKey}`);
                    }
                    return result;
                }
                catch (error) {
                    console.log(`[AI] Tentativa ${attempt + 1} falhou:`, error.message);
                    // Se é a última tentativa, lança o erro
                    if (attempt === maxRetries) {
                        throw error;
                    }
                    // Aguarda antes da próxima tentativa
                    yield new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                }
            }
        }));
    });
}
/**
 * Inicializa o cliente Gemini AI com a API key do storage
 * @throws {ApiKeyError} Se a API key não estiver configurada
 * @throws {StorageError} Se houver erro ao acessar o storage
 */
function initializeGeminiAI() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(() => __awaiter(this, void 0, void 0, function* () {
            const apiKey = yield (0,_config__WEBPACK_IMPORTED_MODULE_1__.getGeminiApiKey)();
            if (!apiKey) {
                throw _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.apiKeyNotConfigured();
            }
            genAI = new _google_generative_ai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenerativeAI(apiKey);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        }), (error) => {
            if (error.code === 'API_KEY_ERROR' || error.code === 'STORAGE_ERROR') {
                return error;
            }
            return _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.geminiApiFailure(error);
        });
    });
}
chrome.commands.onCommand.addListener((command) => __awaiter(void 0, void 0, void 0, function* () {
    if (command === "open_chat") {
        yield chrome.storage.local.clear();
        yield chrome.action.openPopup();
    }
}));
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "CAPTURE_FULL_PAGE") {
        // Usar função assíncrona separada para evitar problemas de message port
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log('[Background] Iniciando captura de página completa...');
                const fullPageResult = yield (0,_utils_fullPageCapture__WEBPACK_IMPORTED_MODULE_5__.captureFullPage)(request.tabId, request.windowId, {
                    maxHeight: 8000,
                    quality: 70,
                    format: 'jpeg',
                    waitTime: 200 // Reduzido para evitar rate limit
                });
                console.log(`[Background] Captura completa: ${fullPageResult.segments} segmentos, ${fullPageResult.captureTime}ms`);
                sendResponse(fullPageResult);
            }
            catch (error) {
                console.error('[Background] Erro na captura de página completa:', error);
                sendResponse({ error: `Erro na captura: ${error}` });
            }
        }))();
        return true; // Manter porta aberta para resposta assíncrona
    }
    else if (request.type === "START_MULTIMODAL_CHAT") {
        const runChatInitialization = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Verifica se a API key está configurada e inicializa o modelo
                if (!model) {
                    try {
                        yield initializeGeminiAI();
                    }
                    catch (error) {
                        const errorMessage = error.userMessage || 'API key do Gemini não configurada. Por favor, configure nas opções da extensão.';
                        sendResponse({ error: errorMessage });
                        return;
                    }
                }
                const { fullPageResult, pageContext } = request;
                // Validar se a captura completa foi bem-sucedida
                if (!fullPageResult || fullPageResult.error) {
                    throw new Error(`Captura de página falhou: ${(fullPageResult === null || fullPageResult === void 0 ? void 0 : fullPageResult.error) || 'Resultado vazio'}`);
                }
                // Usar screenshot da captura completa
                const screenshotDataUrl = fullPageResult.screenshot;
                // Validação adicional do screenshot
                if (!screenshotDataUrl || screenshotDataUrl.length < 100) {
                    throw new Error('Screenshot da página completa está vazio ou inválido');
                }
                console.log(`[Background] Screenshot válido recebido: ${screenshotDataUrl.length} caracteres`);
                // Destilação de contexto com cache inteligente
                const url = ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.url) || 'unknown';
                const contextCacheKey = generateCacheKey(url, pageContext.htmlContent || '');
                // Verifica cache de contexto da página primeiro
                let distilledContext = yield _utils_cache__WEBPACK_IMPORTED_MODULE_3__.pageContextCache.get(contextCacheKey);
                if (!distilledContext) {
                    const distillationResult = yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(() => __awaiter(void 0, void 0, void 0, function* () {
                        // Usa o screenshot já capturado pelo popup
                        // Validação final antes de usar com a IA
                        if (!screenshotDataUrl || screenshotDataUrl.length < 100) {
                            throw new Error("Screenshot da página completa não disponível ou inválido");
                        }
                        console.log(`[Background] Usando captura completa: ${fullPageResult.segments} segmentos, ${fullPageResult.captureTime}ms, ${screenshotDataUrl.length} chars`);
                        // Prompt otimizado e mais direto
                        const prompt = `Analise esta página web brevemente. Liste apenas os pontos principais: conteúdo, funcionalidades e elementos importantes. Seja conciso.`;
                        const imagePart = {
                            inlineData: {
                                data: screenshotDataUrl.split(',')[1],
                                mimeType: 'image/jpeg'
                            }
                        };
                        // Limita o conteúdo HTML para evitar requisições muito grandes
                        const limitedHtmlContent = (pageContext.htmlContent || '').substring(0, 2000);
                        return yield makeAIRequest(prompt, [imagePart, limitedHtmlContent], `distill_${contextCacheKey}`);
                    }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.geminiApiFailure(error));
                    distilledContext = yield distillationResult.response.text();
                    // Armazena contexto no cache de página
                    if (distilledContext) {
                        yield _utils_cache__WEBPACK_IMPORTED_MODULE_3__.pageContextCache.set(contextCacheKey, distilledContext);
                    }
                }
                // Garante que distilledContext não seja null
                const finalContext = distilledContext || 'Contexto não disponível';
                yield chrome.storage.local.set({ distilledContext: finalContext });
                // Geração da saudação com tratamento de erro
                const openingResult = yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(() => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b;
                    const friendlyPrompt = `Você é um colega de trabalho experiente e amigável que acabou de passar pela mesa do usuário e viu o que ele está fazendo no navegador.

CONTEXTO COMPLETO DA PÁGINA:
Título: ${pageContext.title}
URL: ${(fullPageResult === null || fullPageResult === void 0 ? void 0 : fullPageResult.url) || 'N/A'}
Dimensões capturadas: ${(_a = fullPageResult === null || fullPageResult === void 0 ? void 0 : fullPageResult.dimensions) === null || _a === void 0 ? void 0 : _a.width}x${(_b = fullPageResult === null || fullPageResult === void 0 ? void 0 : fullPageResult.dimensions) === null || _b === void 0 ? void 0 : _b.height}px
Segmentos de tela: ${(fullPageResult === null || fullPageResult === void 0 ? void 0 : fullPageResult.segments) || 1}
Conteúdo: ${pageContext.textContent}

Você pode ver a página COMPLETA (não apenas o que está visível), incluindo todo o conteúdo que pode estar fora da tela. Use essa visão completa para oferecer ajuda mais precisa.

Aborde o usuário de forma natural e amigável, como se você tivesse visto o que ele está fazendo e quer ajudar. Seja proativo e útil!

Exemplos de abordagem:
- "Opa! Vi que você está no [site/conteúdo]. Posso te ajudar com alguma coisa?"
- "Interessante esse [tópico]! Tem alguma dúvida específica que eu posso esclarecer?"
- "Notei que você está pesquisando sobre [assunto]. Quer que eu complemente com algumas informações?"

Seja sempre útil e tente fornecer informações valiosas baseadas no que você vê na tela COMPLETA.`;
                    return yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withTimeout)(() => model.generateContent(friendlyPrompt), 15000, 'greetingGeneration');
                }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.geminiApiFailure(error));
                const initialMessage = { role: 'model', text: openingResult.response.text() };
                sendResponse(initialMessage);
                // Salvar TANTO a conversa QUANTO o contexto completo para continuidade
                yield chrome.storage.local.set({
                    activeConversation: { url: (_b = sender.tab) === null || _b === void 0 ? void 0 : _b.url, history: [initialMessage] },
                    fullPageContext: fullPageResult // Salvar screenshot e metadados completos
                });
                console.log('[Background] Contexto completo salvo para continuidade do chat');
            }
            catch (error) {
                _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorLogger.log(error);
                const errorMessage = error.userMessage || `Erro ao analisar a página: ${error.message}`;
                sendResponse({ error: errorMessage });
            }
        });
        runChatInitialization();
        return true;
    }
    else if (request.type === "SEND_CHAT_MESSAGE") {
        const runContinueChat = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                // Verifica se a API key está configurada e inicializa o modelo
                if (!model) {
                    try {
                        yield initializeGeminiAI();
                    }
                    catch (error) {
                        const errorMessage = error.userMessage || 'API key do Gemini não configurada. Por favor, configure nas opções da extensão.';
                        sendResponse({ error: errorMessage });
                        return;
                    }
                }
                const currentHistory = request.history;
                // Recuperar TANTO o contexto destilado QUANTO o screenshot original
                const data = yield chrome.storage.local.get(['distilledContext', 'fullPageContext']);
                if (!data.distilledContext)
                    throw new Error("Contexto destilado não encontrado.");
                // Obter a última pergunta do usuário
                const lastUserMessage = currentHistory[currentHistory.length - 1];
                const userQuestion = (lastUserMessage === null || lastUserMessage === void 0 ? void 0 : lastUserMessage.text) || '';
                // Primeira tentativa: resposta com contexto da página
                const initialResult = yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(() => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b, _c;
                    // Preparar conteúdo multimodal se screenshot estiver disponível
                    const parts = [];
                    // Adicionar screenshot se disponível (mantém contexto visual)
                    if ((_a = data.fullPageContext) === null || _a === void 0 ? void 0 : _a.screenshot) {
                        parts.push({
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: data.fullPageContext.screenshot.split(',')[1]
                            }
                        });
                        console.log('[Background] Usando screenshot completo na continuação do chat');
                    }
                    // Prompt melhorado que mantém contexto visual + textual
                    const contextPrompt = `Você é um colega de trabalho amigável que pode ver esta página completa.

CONTEXTO DA PÁGINA:
${data.distilledContext}

${data.fullPageContext ? `INFORMAÇÕES ADICIONAIS:
- Dimensões: ${(_b = data.fullPageContext.dimensions) === null || _b === void 0 ? void 0 : _b.width}x${(_c = data.fullPageContext.dimensions) === null || _c === void 0 ? void 0 : _c.height}px
- Segmentos capturados: ${data.fullPageContext.segments}
- URL: ${data.fullPageContext.url}
` : ''}
Você pode ver a página COMPLETA (incluindo partes fora da tela) e deve usar tanto a visão visual quanto o contexto textual para responder.

Se a informação não estiver visível na página, responda "PRECISO_PESQUISAR" seguido de uma explicação breve do que precisa buscar. Use formatação Markdown.

HISTÓRICO DA CONVERSA:`;
                    parts.push({ text: contextPrompt });
                    const promptForGenerativeModel = [
                        { role: "user", parts },
                        ...currentHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }))
                    ];
                    return yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withTimeout)(() => model.generateContent({ contents: promptForGenerativeModel }), 20000, 'chatContinuation');
                }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.geminiApiFailure(error));
                const initialResponse = initialResult.response.text();
                // Verificar se precisa de pesquisa web
                const needsSearch = (0,_utils_webSearch__WEBPACK_IMPORTED_MODULE_6__.needsWebSearch)(initialResponse, userQuestion) || initialResponse.includes('PRECISO_PESQUISAR');
                let finalResult = initialResult;
                if (needsSearch) {
                    console.log('[Background] IA indicou necessidade de pesquisa web');
                    // Verificar se pesquisa web está disponível
                    const searchAvailability = yield (0,_utils_webSearch__WEBPACK_IMPORTED_MODULE_6__.checkWebSearchAvailability)();
                    if (searchAvailability.available) {
                        try {
                            // Extrair query de pesquisa
                            const searchQuery = (0,_utils_webSearch__WEBPACK_IMPORTED_MODULE_6__.extractSearchQuery)(userQuestion, data.distilledContext, (_a = data.fullPageContext) === null || _a === void 0 ? void 0 : _a.url);
                            console.log(`[Background] Pesquisando na web: "${searchQuery}"`);
                            // Realizar pesquisa
                            const searchResults = yield (0,_utils_webSearch__WEBPACK_IMPORTED_MODULE_6__.performWebSearch)(searchQuery, {
                                maxResults: 3,
                                language: 'pt',
                                region: 'br'
                            });
                            // Combinar contexto da página com resultados da pesquisa
                            const enhancedContext = (0,_utils_webSearch__WEBPACK_IMPORTED_MODULE_6__.combineSearchWithPageContext)(data.distilledContext, searchResults, userQuestion);
                            // Gerar resposta final com contexto expandido
                            const enhancedResult = yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(() => __awaiter(void 0, void 0, void 0, function* () {
                                var _a;
                                const parts = [];
                                // Adicionar screenshot se disponível
                                if ((_a = data.fullPageContext) === null || _a === void 0 ? void 0 : _a.screenshot) {
                                    parts.push({
                                        inlineData: {
                                            mimeType: "image/jpeg",
                                            data: data.fullPageContext.screenshot.split(',')[1]
                                        }
                                    });
                                }
                                const enhancedPrompt = `Você é um colega de trabalho expert que tem acesso tanto à página atual quanto a informações da web.

${enhancedContext}

Agora responda de forma completa e útil, combinando as informações da página com os dados da web. Seja natural e amigável, como um colega que realmente quer ajudar.

HISTÓRICO DA CONVERSA:`;
                                parts.push({ text: enhancedPrompt });
                                const promptForGenerativeModel = [
                                    { role: "user", parts },
                                    ...currentHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }))
                                ];
                                return yield (0,_utils_errors__WEBPACK_IMPORTED_MODULE_2__.withTimeout)(() => model.generateContent({ contents: promptForGenerativeModel }), 25000, 'enhancedChatContinuation');
                            }), (error) => _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory.geminiApiFailure(error));
                            finalResult = enhancedResult;
                            console.log(`[Background] Resposta gerada com pesquisa web (${searchResults.results.length} resultados)`);
                        }
                        catch (searchError) {
                            console.error('[Background] Erro na pesquisa web:', searchError);
                            // Usar resposta inicial se pesquisa falhar
                            console.log('[Background] Usando resposta inicial devido a erro na pesquisa');
                        }
                    }
                    else {
                        console.log('[Background] Pesquisa web não disponível (APIs não configuradas)');
                        // Modificar resposta inicial para informar sobre limitação
                        const limitedResponse = initialResponse.replace('PRECISO_PESQUISAR', 'Hmm, essa informação não está visível nesta página. Para ter acesso a pesquisas na web, é necessário configurar uma API de busca nas configurações da extensão.');
                        finalResult = {
                            response: {
                                text: () => limitedResponse
                            }
                        };
                    }
                }
                const result = finalResult;
                const newAIMessage = { role: 'model', text: result.response.text() };
                sendResponse({ text: newAIMessage.text });
                const updatedHistory = [...currentHistory, newAIMessage];
                const currentConversation = yield chrome.storage.local.get("activeConversation");
                yield chrome.storage.local.set({
                    activeConversation: Object.assign(Object.assign({}, currentConversation.activeConversation), { history: updatedHistory })
                });
            }
            catch (error) {
                _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ErrorLogger.log(error);
                const errorMessage = error.userMessage || error.message;
                sendResponse({ error: errorMessage });
            }
        });
        runContinueChat();
        return true;
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map