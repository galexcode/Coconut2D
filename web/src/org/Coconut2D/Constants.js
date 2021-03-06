//@compile{true}  

/* ***** BEGIN LICENSE BLOCK *****
 *
 * Copyright (C) 2013 www.coconut2D.org
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.   
 *
 * ***** END LICENSE BLOCK ***** */

// ==================================================================================================================================
//	   ______                 __              __      
//	  / ____/___  ____  _____/ /_____ _____  / /______
//	 / /   / __ \/ __ \/ ___/ __/ __ `/ __ \/ __/ ___/
//	/ /___/ /_/ / / / (__  ) /_/ /_/ / / / / /_(__  ) 
//	\____/\____/_/ /_/____/\__/\__,_/_/ /_/\__/____/  
//	                                                  
// ==================================================================================================================================

var GLOBAL_FPS = 24;
var MAX_TEXTURES = 8;

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum for screen resolution dpi.
 * @enum {number}
 */
var SCREEN_RESOLUTION_DPI_ENUM =
{
    RESOLUTION_nodpi							: 0,
    RESOLUTION_ldpi								: 1,
    RESOLUTION_mdpi								: 2,
    RESOLUTION_tvdpi							: 3,
    RESOLUTION_hdpi								: 4,
    RESOLUTION_xhdpi							: 5,
    RESOLUTION_Retina							: 5,
    RESOLUTION_DefaultDpi						: 0
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum for clip symbol loop synchronization.
 * @enum {number}
 */
var COCO_CLIP_SYMBOL_LOOP_ENUM =
{
    CLIP_SYMBOL_LOOP_CONTINUOUS					: 0,
    CLIP_SYMBOL_LOOP_SYNCHRONIZED_WITH_PARENT	: 1,
    CLIP_SYMBOL_LOOP_ONCE						: 2
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum for keyframe interpolation calculation.
 * @enum {number}
 */
var COCO_KEYFRAME_INTERPOLATION_ENUM = 
{
    KEYFRAME_INTERPOLATION_NONE					: 0,
    KEYFRAME_INTERPOLATION_MOTION_TWEEN			: 1,
    KEYFRAME_INTERPOLATION_ECHO					: 2,
    KEYFRAME_INTERPOLATION_PHYSICS				: 3
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum for engine states.
 * @enum {number}
 */
var COCO_ENGINE_STATES_ENUM = 
{ 
	STATE_NONE: 0
};


var COCO_WEBGL_PAYLOAD_OP = 
{ 
	BINDBUFFER					: 0,
	BINDTEXTURE					: 1,
	DRAWARRAYS					: 2,
	UNIFORM1I					: 3,
	UNIFORM2F					: 4,
	UNIFORM4F					: 5,
	UNIFORMMATRIX4FV			: 6,
	VERTEXATTRIBPOINTER			: 7
	
};

////////////////////////////////////////////////////////////////////////////////////////////////////
var COCO_STOP_ON_CURRENT_FRAME					= -1;



