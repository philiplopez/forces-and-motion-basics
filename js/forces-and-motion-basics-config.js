// Copyright 2013-2015, University of Colorado Boulder

require.config( {
  deps: [ 'forces-and-motion-basics-main' ],

  paths: {

    //Load dependencies from sibling directories
    AXON: '../../axon/js',
    BRAND: '../../brand/' + phet.chipper.brand + '/js',
    DOT: '../../dot/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    PHET_IO: '../../phet-io/js',
    PHETCOMMON: '../../phetcommon/js',
    REPOSITORY: '..',
    SUN: '../../sun/js',
    JOIST: '../../joist/js',
    FORCES_AND_MOTION_BASICS: '../../forces-and-motion-basics/js',
    VIBE: '../../vibe/js',
    TANDEM: '../../tandem/js',

    //Load plugins
    audio: '../../chipper/js/requirejs-plugins/audio',
    image: '../../chipper/js/requirejs-plugins/image',
    mipmap: '../../chipper/js/requirejs-plugins/mipmap',
    string: '../../chipper/js/requirejs-plugins/string',
    ifphetio: '../../chipper/js/requirejs-plugins/ifphetio',

    // third-party libs
    text: '../../sherpa/lib/text-2.0.12'
  },

  // optional cache buster to make browser refresh load all included scripts, can be disabled with ?cacheBuster=false
  urlArgs: phet.chipper.getCacheBusterArgs()
} );
