<!--
/*
    sprintf.js

        Implement printf of C language.
        To use this javascript source, see sprintf.html.

    Coyright (C) javaclue.org 2004-

    License: GNU LGPL

        GNU LESSER GENERAL PUBLIC LICENSE
        Version 2.1, February 1999 


        Copyright (C) 1991, 1999 Free Software Foundation, Inc.
        59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
        Everyone is permitted to copy and distribute verbatim copies
        of this license document, but changing it is not allowed.

        [This is the first released version of the Lesser GPL.  It also counts
         as the successor of the GNU Library Public License, version 2, hence
         the version number 2.1.]
*/

    function sprintf(format1, v) {
        var fmt0, s0;
        fmt0 = format1;

        if (typeof(v) == "number")
            return formatNumber(fmt0, v);

        s0 = "" + v;
        return format(fmt0, "" + s0);

        function spaces(cnt) {
            var count = Math.floor(cnt);
            var t = "";
            for (var i = 0; i < count; i++) {
                t += ' ';
            }
            return t;
        }

        function sharps(cnt) {
            var count = Math.floor(cnt);
            var t = "";
            for (var i = 0; i < count; i++) {
                t += '#';
            }
            return t;
        }

        function zeros(cnt) {
            var count = Math.floor(cnt);
            var t = "";
            for (var i = 0; i < count; i++) {
                t += '0';
            }
            return t;
        }

        function byteLength(s) {
            var n = 0;
            var c;
            for (var i = 0; i < s.length; i++) {
                c = s.charAt(i);
                if (c.charCodeAt(0) > 0xFF)
                    n += 2;
                else
                    n++;
            }
            return n;
        }


        function format(fmt, s) {
            var t = "";
            var NORMAL_STATE = 0;
            var PERCENT_STATE = 1;
            var L_STATE = 2;
            var WIDTH_DIGIT_STATE = 3;
            var POINT_DIGIT_STATE = 4;
            var state = NORMAL_STATE;
            var width = 0;
            var pwidth = 0;
            var blen = 0;
            var align = 'left';
            var pos = 0;
            var str = "";
            var a;
            for (var i = 0; i < fmt.length; i++) {
                a = fmt.charAt(i);
                switch (state) {
                    case NORMAL_STATE:
                        if (a != '%')
                            t += a;
                        else {
                            width = 0;
                            pwidth = 0;
                            align = 'left';
                            state = PERCENT_STATE;
                        }
                        break;
                    case PERCENT_STATE:
                        if (a == '%') {
                            t += a;
                            state = NORMAL_STATE;
                        }
                        else if (a == '+') {
                            align = 'right';
                            state = WIDTH_DIGIT_STATE;
                        }
                        else if (a == '-') {
                            align = 'left';
                            width = 0;
                            state = WIDTH_DIGIT_STATE;
                        }
                        else if (a == '@') {
                            align = 'center';
                            width = 0;
                            state = WIDTH_DIGIT_STATE;
                        }
                        else if (a >= '0' && a <= '9') {
                            alignRight = true;
                            width = a.charCodeAt(0) - '0'.charCodeAt(0);
                            state = WIDTH_DIGIT_STATE;
                       }
                       else if (a == '.') {
                           align = 'left';
                           width = 0;
                           pwidth = 0;
                           state = POINT_DIGIT_STATE;
                       }
                       else if (a == 's' || a == 'S') {
                           str = "" + s;
                           blen = byteLength(str);    //
                           if (width >= blen) {       //
                               if (align == 'right')
                                   t += spaces(width - blen) + str;
                               else if (align == 'left')
                                   t += str + spaces(width - blen);
                               else
                                   t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                           }
                           else
                               t += str;
                           state = NORMAL_STATE;
                       }
                       else {
                           t += a;
                           state = NORMAL_STATE;
                       }
                       break;
                   case WIDTH_DIGIT_STATE:
                       if (a == '.') {
                           pwidth = 0;
                           state = POINT_DIGIT_STATE;
                       }
                       else if (a >= '0' && a <= '9') {
                           width = 10*width + (a.charCodeAt(0) - '0'.charCodeAt(0));
                       }
                       else if (a == 's' || a == 'S') {
                           str = "" + s;
                           blen = byteLength(str);
                           if (width >= blen) {    //
                               if (align == 'right') {
                                   t += spaces(width - blen) + str;
                               }
                               else if (align == 'left')
                                   t += str + spaces(width - blen);
                               else
                                   t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                           }
                           else
                               t += str;
                           state = NORMAL_STATE;
                       }
                       else {
                           t += a;
                           state = NORMAL_STATE;
                       }
                       break;
                }
            }
            return t;
        }


    function formatNumber(fmt, d) {
        var t = "";
        var NORMAL_STATE = 0;
        var PERCENT_STATE = 1;
        var L_STATE = 2;
        var WIDTH_DIGIT_STATE = 3;
        var POINT_DIGIT_STATE = 4;
        var state = NORMAL_STATE;
        var width = 0;
        var pwidth = 0;
        var blen = 0;
        var align = 'left';
        var pos = 0;
        var str = "";
        var a;
        for (var i = 0; i < fmt.length; i++) {
            a = fmt.charAt(i);
            switch (state) {
                case NORMAL_STATE:
                   if (a != '%')
                       t += a;
                   else {
                       width = 0;
                       pwidth = 0;
                       align = 'left';
                       state = PERCENT_STATE;
                   }
                   break;
                case PERCENT_STATE:
                   if (a == '%') {
                       t += a;
                       state = NORMAL_STATE;
                   }
                   else if (a == '+') {
                       align = 'right';
                       state = WIDTH_DIGIT_STATE;
                   }
                   else if (a == '-') {
                       align = 'left';
                       width = 0;
                       state = WIDTH_DIGIT_STATE;
                   }
                   else if (a == '@') {
                       align = 'center';
                       width = 0;
                       state = WIDTH_DIGIT_STATE;
                   }
                   else if (a >= '0' && a <= '9') {
                       align = 'left';
                       width = a.charCodeAt(0) - '0'.charCodeAt(0);
                       state = WIDTH_DIGIT_STATE;
                   }
                   else if (a == '.') {
                       align = 'left';
                       width = 0;
                       pwidth = 0;
                       state = POINT_DIGIT_STATE;
                   }
                   else if (a == 'x' || a == 'X') {
                       str = "" + d.toString(16);
                       if (a == 'X')
                           str = str.toUpperCase();
                       t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'l' || a == 'L') {
                       state = L_STATE;
                   }
                   else if (a == 'o' || a == 'O') {
                       str = "" + d.toString(8);
                       t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'd' || a == 'u' || a == 'D' || a == 'U') {
                       str = "" + Math.round(d);
                       t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'e' || a == 'E') {
                       state = NORMAL_STATE;
                   }
                   else if (a == 'f' || a == 'g' || a == 'F' || a == 'G') {
                       str = "" + d;
                       blen = byteLength(str);   //
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else {
                       t += a;
                       state = NORMAL_STATE;
                   }
                   break;
                case L_STATE:
                   if (a == 'x' || a == 'X') {
                       str = "" + d.toString(16);
                       blen = byteLength(str);   //
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'd' || a == 'u' || a == 'D' || a == 'U') {
                       str = "" + Math.round(d);
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else {
                       t += a;
                       state = NORMAL_STATE;
                   }
                   break;
                case WIDTH_DIGIT_STATE:
                   if (a == '.') {
                       pwidth = 0;
                       state = POINT_DIGIT_STATE;
                   }
                   else if (a >= '0' && a <= '9') {
                       width = 10*width + (a.charCodeAt(0) - '0'.charCodeAt(0));
                   }
                   else if (a == 'd' || a == 'u' || a == 'D' || a == 'U') {
                       str = "" + Math.round(d);
                       if (a == 'D')
                           str = str.toUpperCase();
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'x' || a == 'X') {
                       str = "" + d.toString(16);
                       if (a == 'X')
                           str = str.toUpperCase();
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'o' || a == 'O') {
                       str = "" + d.toString(8);
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'l' || a == 'L') {
                       state = L_STATE;
                   }
                   else if (a == 'f' || a == 'g' || a == 'F' || a == 'G') {
                       str = "" + d.toFixed();
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else {
                       t += a;
                       state = NORMAL_STATE;
                   }
                   break;
                case POINT_DIGIT_STATE:
                   if (a >= '0' && a <= '9') {
                       pwidth = 10*pwidth + (a.charCodeAt(0) - '0'.charCodeAt(0));
                   }
                   else if (a == 'l' || a == 'L') {
                       state = L_STATE;
                   }
                   else if (a == 'e' || a == 'E') {
                       var str = d.toExponential(pwidth);
                       blen = byteLength(str);
                       if (width >= blen) {   // Fix a bug of 1.1
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'd' || a == 'u' || a == 'D' || a == 'U') {
                       str = "" + Math.round(d);
                       if (a == 'D')
                           str = str.toUpperCase();
                       blen = byteLength(str);
                       if (width >= blen) {    //
                           if (align == 'right')
                               t += spaces(width - blen) + str;
                           else if (align == 'left')
                               t += str + spaces(width - blen);
                           else
                               t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                       }
                       else
                           t += str;
                       state = NORMAL_STATE;
                   }
                   else if (a == 'f' || a == 'g' || a == 'F' || a == 'G') {
                       if (pwidth > 0) {
                           var str = d.toFixed(pwidth);
                           blen = byteLength(str);
                           if (width >= blen) {   // Fix a bug of 1.1
                               if (align == 'right')
                                   t += spaces(width - blen) + str;
                               else if (align == 'left')
                                   t += str + spaces(width - blen);
                               else
                                   t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                           }
                       }
                       else {
                           str = "" + Math.round(d);
                           blen = byteLength(str);
                           if (width >= blen) {    //
                               if (align == 'right')
                                   t += spaces(width - blen) + str;
                               else if (align == 'left')
                                   t += str + spaces(width - blen);
                               else
                                   t += spaces(Math.floor((width - blen)/2)) + str + spaces((width - blen) - Math.floor((width - blen)/2));
                           }
                       }
                       state = NORMAL_STATE;
                   }
                   else {
                       t += a;
                       state = NORMAL_STATE;
                   }
                   break;
            }
        }
            return t;
        }
    }
//-->