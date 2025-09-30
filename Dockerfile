FROM wordpress:latest

# Install packages under Debian
RUN apt-get update && \
    apt-get -y install git && \
    apt-get -y install iputils-ping

# Install Xdebug via PECL (auto-selects a compatible version for the current PHP)
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Copy xdebug.ini to /usr/local/etc/php/conf.d/
COPY docker-configs/xdebug.ini /usr/local/etc/php/conf.d/

# Copy php-file-size.ini to /usr/local/etc/php/conf.d/
COPY docker-configs/php-file-size.ini /usr/local/etc/php/conf.d/

# docker-php-ext-enable already executed above.