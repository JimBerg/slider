<?php include_once 'readfiles.php'; ?>
<?php $images = new Images(); ?>
<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>

        <div class="slider-wrapper">
            <div class="slider-left">
                <div class="slider-mask full">
                    <?php /* load full images - replace with appropriate asp tags */ ?>
                    <?php $full = $images->getImagesFromDir('images', 1); ?>
                    <ul id="full-slider">
                    <?php foreach($full as $img): ?>
                        <li data-id="<?php echo $img['data-id']; ?>"><a href="#"><img src="images/<?php echo $img['src']; ?>" /></a></li>
                    <?php endforeach; ?>
                    </ul>
                </div>
            </div> 
            <div class="slider-right">
                <div class="slider-mask thumbs">
                    <?php /* load thumb images */ ?>
                    <?php 
                        $index = -1;
                        $thumbs = $images->getImagesFromDir('images', 2); 
                    ?>
                    <ul id="thumb-slider">
                    <?php foreach($thumbs as $img): ?>
                        <li data-id="<?php echo $img['data-id']; ?>" data-index="<?php echo $index; ?>"><a href="#"><img src="images/<?php echo $img['src']; ?>" /></a></li>
                        <?php $index++; ?>
                    <?php endforeach; ?>
                    </ul>
                </div>
            </div>       
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/script.js"></script>
    </body>
</html>