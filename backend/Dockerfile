FROM php:7.4-fpm-alpine AS base

# add necessary packages
RUN apk --update add && apk add git zlib-dev libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Install composer
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

## Set composer valiables
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin

## Download laravel installer
RUN composer global require laravel/installer

#### Build for development.
FROM base AS dev

## add development packages.
RUN apk add autoconf gcc g++ make


