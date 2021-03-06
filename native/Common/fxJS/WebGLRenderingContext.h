#ifndef _WebGLRenderingContext_h
#define _WebGLRenderingContext_h


#include "ArrayBuffer.h"

class WebGLRenderingContext
{
public:
	enum COCO_WEBGL_PAYLOAD_OP {
		BINDBUFFER					= 0x0,
		BINDTEXTURE					= 0x1,
		DRAWARRAYS					= 0x2,
		UNIFORM1I					= 0x3,
		UNIFORM2F					= 0x4,
		UNIFORM4F					= 0x5,
		VERTEXATTRIBPOINTER			= 0x6,
		length
	};
	static fxJSBindFunction(_execute);
	static fxJSBindFunction(_getContextAttributes);
	static fxJSBindFunction(_isContextLost);
	static fxJSBindFunction(_getSupportedExtensions);
	static fxJSBindFunction(_getExtension);
	static fxJSBindFunction(_activeTexture);
	static fxJSBindFunction(_attachShader);
	static fxJSBindFunction(_bindAttribLocation);
	static fxJSBindFunction(_bindBuffer);
	static fxJSBindFunction(_bindFramebuffer);
	static fxJSBindFunction(_bindRenderbuffer);
	static fxJSBindFunction(_bindTexture);
	static fxJSBindFunction(_blendColor);
	static fxJSBindFunction(_blendEquation);
	static fxJSBindFunction(_blendEquationSeparate);
	static fxJSBindFunction(_blendFunc);
	static fxJSBindFunction(_blendFuncSeparate);
	static fxJSBindFunction(_bufferData);
	static fxJSBindFunction(_bufferSubData);
	static fxJSBindFunction(_checkFramebufferStatus);
	static fxJSBindFunction(_clear);
	static fxJSBindFunction(_clearColor);
	static fxJSBindFunction(_clearDepth);
	static fxJSBindFunction(_clearStencil);
	static fxJSBindFunction(_colorMask);
	static fxJSBindFunction(_compileShader);
	static fxJSBindFunction(_compressedTexImage2D);
	static fxJSBindFunction(_compressedTexSubImage2D);
	static fxJSBindFunction(_copyTexImage2D);
	static fxJSBindFunction(_copyTexSubImage2D);
	static fxJSBindFunction(_createBuffer);
	static fxJSBindFunction(_createFramebuffer);
	static fxJSBindFunction(_createProgram);
	static fxJSBindFunction(_createRenderbuffer);
	static fxJSBindFunction(_createShader);
	static fxJSBindFunction(_createTexture);
	static fxJSBindFunction(_cullFace);
	static fxJSBindFunction(_deleteBuffer);
	static fxJSBindFunction(_deleteFramebuffer);
	static fxJSBindFunction(_deleteProgram);
	static fxJSBindFunction(_deleteRenderbuffer);
	static fxJSBindFunction(_deleteShader);
	static fxJSBindFunction(_deleteTexture);
	static fxJSBindFunction(_depthFunc);
	static fxJSBindFunction(_depthMask);
	static fxJSBindFunction(_depthRange);
	static fxJSBindFunction(_detachShader);
	static fxJSBindFunction(_disable);
	static fxJSBindFunction(_disableVertexAttribArray);
	static fxJSBindFunction(_drawArrays);
	static fxJSBindFunction(_drawElements);
	static fxJSBindFunction(_enable);
	static fxJSBindFunction(_enableVertexAttribArray);
	static fxJSBindFunction(_finish);
	static fxJSBindFunction(_flush);
	static fxJSBindFunction(_framebufferRenderbuffer);
	static fxJSBindFunction(_framebufferTexture2D);
	static fxJSBindFunction(_frontFace);
	static fxJSBindFunction(_generateMipmap);
	static fxJSBindFunction(_getActiveAttrib);
	static fxJSBindFunction(_getActiveUniform);
	static fxJSBindFunction(_getAttachedShaders);
	static fxJSBindFunction(_getAttribLocation);
	static fxJSBindFunction(_getBufferParameter);
	static fxJSBindFunction(_getParameter);
	static fxJSBindFunction(_getError);
	static fxJSBindFunction(_getFramebufferAttachmentParameter);
	static fxJSBindFunction(_getProgramParameter);
	static fxJSBindFunction(_getProgramInfoLog);
	static fxJSBindFunction(_getRenderbufferParameter);
	static fxJSBindFunction(_getShaderParameter);
	static fxJSBindFunction(_getShaderPrecisionFormat);
	static fxJSBindFunction(_getShaderInfoLog);
	static fxJSBindFunction(_getShaderSource);
	static fxJSBindFunction(_getTexParameter);
	static fxJSBindFunction(_getUniform);
	static fxJSBindFunction(_getUniformLocation);
	static fxJSBindFunction(_getVertexAttrib);
	static fxJSBindFunction(_getVertexAttribOffset);
	static fxJSBindFunction(_hint);
	static fxJSBindFunction(_isBuffer);
	static fxJSBindFunction(_isEnabled);
	static fxJSBindFunction(_isFramebuffer);
	static fxJSBindFunction(_isProgram);
	static fxJSBindFunction(_isRenderbuffer);
	static fxJSBindFunction(_isShader);
	static fxJSBindFunction(_isTexture);
	static fxJSBindFunction(_lineWidth);
	static fxJSBindFunction(_linkProgram);
	static fxJSBindFunction(_pixelStorei);
	static fxJSBindFunction(_polygonOffset);
	static fxJSBindFunction(_readPixels);
	static fxJSBindFunction(_renderbufferStorage);
	static fxJSBindFunction(_sampleCoverage);
	static fxJSBindFunction(_scissor);
	static fxJSBindFunction(_shaderSource);
	static fxJSBindFunction(_stencilFunc);
	static fxJSBindFunction(_stencilFuncSeparate);
	static fxJSBindFunction(_stencilMask);
	static fxJSBindFunction(_stencilMaskSeparate);
	static fxJSBindFunction(_stencilOp);
	static fxJSBindFunction(_stencilOpSeparate);
	static fxJSBindFunction(_texImage2D);
	static fxJSBindFunction(_texParameterf);
	static fxJSBindFunction(_texParameteri);
	static fxJSBindFunction(_texSubImage2D);
	static fxJSBindFunction(_uniform1f);
	static fxJSBindFunction(_uniform1fv);
	static fxJSBindFunction(_uniform1i);
	static fxJSBindFunction(_uniform1iv);
	static fxJSBindFunction(_uniform2f);
	static fxJSBindFunction(_uniform2fv);
	static fxJSBindFunction(_uniform2i);
	static fxJSBindFunction(_uniform2iv);
	static fxJSBindFunction(_uniform3f);
	static fxJSBindFunction(_uniform3fv);
	static fxJSBindFunction(_uniform3i);
	static fxJSBindFunction(_uniform3iv);
	static fxJSBindFunction(_uniform4f);
	static fxJSBindFunction(_uniform4fv);
	static fxJSBindFunction(_uniform4i);
	static fxJSBindFunction(_uniform4iv);
	static fxJSBindFunction(_uniformMatrix2fv);
	static fxJSBindFunction(_uniformMatrix3fv);
	static fxJSBindFunction(_uniformMatrix4fv);
	static fxJSBindFunction(_useProgram);
	static fxJSBindFunction(_validateProgram);
	static fxJSBindFunction(_vertexAttrib1f);
	static fxJSBindFunction(_vertexAttrib1fv);
	static fxJSBindFunction(_vertexAttrib2f);
	static fxJSBindFunction(_vertexAttrib2fv);
	static fxJSBindFunction(_vertexAttrib3f);
	static fxJSBindFunction(_vertexAttrib3fv);
	static fxJSBindFunction(_vertexAttrib4f);
	static fxJSBindFunction(_vertexAttrib4fv);
	static fxJSBindFunction(_vertexAttribPointer);
	static fxJSBindFunction(_viewport);
};

#endif
