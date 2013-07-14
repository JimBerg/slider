<?php
class Images {

	/**
	* get files from specified dir
	* pretty much gebastel ;)
	* @param string path
	* @param int type (1: full, 2: thumb)
	* @return array filesCollection
	* --------------------------------------------*/
	public function getImagesFromDir( $path, $type = 0 ) 
	{
		$files = array();
		$filesCollection = array();

		if( is_dir( $path ) ) {
			if( $handle = opendir( $path ) ) {
		        while( $file = readdir( $handle ) ) {
		            if( $file != "." && $file != ".." && $file[0] != '.' ) {
		                if( is_dir( $path . "/" . $file ) ) {
		                    $files = $this->getImagesFromDir( $path . "/" . $file );
		                    if( is_array( $files ) ) {
		                    	$files = array_merge( $filesCollection, $files ); 
		                    }
		                } else {
		                	if( $type == 1 ) {
		                		if ( preg_match( '/_480/', $file, $match ) ) {
		                			preg_match( '/\d+/', $file, $match );
				                    array_push( $filesCollection, 
				                    	array( 
											'data-id' => (int)$match[0],
											'src' => $file,
										)
									);
		                		}			                    
		                	} else if( $type == 2 ) {
		                		if ( preg_match( '/_120/', $file, $match ) ) {
		                			preg_match( '/\d+/', $file, $match );
				                    array_push( $filesCollection, 
				                    	array( 
											'data-id' => (int)$match[0],
											'src' => $file,
										)
									);
		                		}		
		                	} else {
		                		return array('error' => 'something went wrong.');
		                	}
		                }
		            }
		        }
		    closedir( $handle );
		    return $filesCollection;
			}
		}	
	} 
}


